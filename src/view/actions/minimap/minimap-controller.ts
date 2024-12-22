import { CANVAS_WIDTH_CPX } from 'src/view/actions/minimap/constants';
import { debouncedUpdateScrollIndicator } from 'src/view/actions/minimap/scroll-indicator/update-scroll-indicator';
import { ExtendedTreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { calculateScrollDeltaToActiveCard } from 'src/view/actions/minimap/scroll-indicator/calculate-scroll-delta-to-active-card';
import invariant from 'tiny-invariant';
import {
    MinimapTheme,
    minimapTheme,
    refreshMinimapTheme,
} from 'src/view/actions/minimap/minimap-theme';
import { onCanvasClick } from 'src/view/actions/minimap/event-handlers/on-canvas-click';
import { onCanvasWheel } from 'src/view/actions/minimap/event-handlers/on-canvas-wheel';
import { LineageView } from 'src/view/view';
import { id } from 'src/helpers/id';
import { drawMinimapWorker } from 'src/view/actions/minimap/worker-instances';
import { createOnCanvasMousemove } from 'src/view/actions/minimap/event-handlers/create-on-canvas-mousemove';
import { getTheme } from 'src/obsidian/helpers/get-theme';
import { debounce } from 'src/helpers/debounce';

export type MinimapProps = {
    activeCardId: string;
    tree: ExtendedTreeNode[];
    dom: MinimapDomElements | null;
    canvasId: string;
    isLightTheme: boolean;
};

export type CardRange = {
    y_start: number;
    y_end: number;
    cardId: string;
};
export type CardRanges = {
    [cardId: string]: CardRange;
};

export type MinimapState = {
    scrollPosition_cpx: number;
    totalDrawnHeight_cpx: number;
    initialized: boolean;
    ranges: {
        cards: CardRanges;
    };
};

export type MinimapDomElements = {
    canvas: HTMLCanvasElement;
    scrollIndicator: HTMLElement;
    offscreen: OffscreenCanvas;
};

export class MinimapController {
    private props: MinimapProps = {
        tree: [],
        activeCardId: '',
        dom: null,
        isLightTheme: false,
        canvasId: '',
    };

    private state: MinimapState = {
        scrollPosition_cpx: 0,
        totalDrawnHeight_cpx: 0,
        initialized: false,
        ranges: {
            cards: {},
        },
    };
    private subscriptions: Set<() => void> = new Set();

    public constructor(private view: LineageView) {}

    private get enabled() {
        return Boolean(this.props.dom) && this.state.initialized;
    }

    public getDom(): MinimapDomElements {
        invariant(this.props.dom);
        return this.props.dom;
    }

    public getState(): MinimapState {
        return this.state;
    }

    public async onLoad(container: HTMLElement) {
        const scrollIndicator = container.querySelector(
            '#scrollIndicator',
        ) as HTMLElement;
        const canvas = container.querySelector('canvas');
        invariant(canvas);
        invariant(scrollIndicator);
        canvas.width = CANVAS_WIDTH_CPX;
        refreshMinimapTheme();
        const offscreen = canvas.transferControlToOffscreen();
        this.props.isLightTheme = getTheme() === 'light';
        this.props.canvasId = id.canvas();

        this.props.dom = {
            offscreen,
            canvas,
            scrollIndicator,
        };
        await this.initializeWorker(minimapTheme.current);

        const onClick = (e: MouseEvent) => {
            onCanvasClick(e, this.view);
        };
        const onWheel = (e: WheelEvent) => onCanvasWheel(e, this.view);

        const onMousemove = createOnCanvasMousemove(this.view);

        this.view.contentEl.addClass('lineage-view__content-el--minimap-on');
        canvas.addEventListener('click', onClick);
        container.addEventListener('wheel', onWheel);
        container.addEventListener('mousemove', onMousemove);

        this.debouncedSetDocument(this.view.documentStore.getValue().document);
        const viewState = this.view.viewStore.getValue();
        this.debouncedSetSearchResults(viewState.search.results);

        this.debouncedSetActiveCardId(viewState.document.activeNode);
        this.subscriptions.add(() => {
            canvas.removeEventListener('click', onClick);
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('mousemove', onMousemove);
        });
    }

    public onUnload() {
        for (const unsub of this.subscriptions) {
            unsub();
        }
        this.props.dom = null;
        this.view.contentEl.removeClass('lineage-view__content-el--minimap-on');
        this.destroyWorker();
    }

    public debouncedSetDocument = debounce(
        async (lineageDocument: LineageDocument) => {
            if (!this.enabled) return;
            const payload = await drawMinimapWorker.run({
                type: 'minimap/set/document',
                payload: {
                    document: lineageDocument,
                    canvasId: this.props.canvasId,
                    activeNodeId: this.props.activeCardId,
                },
            });
            invariant(payload);
            this.state.ranges.cards = payload.cardRanges;
            this.state.totalDrawnHeight_cpx = payload.totalDrawnHeight_cpx;
            this.debouncedScrollCardIntoView();
        },
        100,
    );

    public debouncedSetActiveCardId = debounce((nodeId: string): void => {
        if (!nodeId) return;
        if (nodeId === this.props.activeCardId) return;
        this.props.activeCardId = nodeId;
        drawMinimapWorker.run({
            type: 'minimap/set/active-node',
            payload: {
                canvasId: this.props.canvasId,
                activeNodeId: nodeId,
            },
        });
        this.debouncedScrollCardIntoView();
    }, 16);

    public setScrollPosition(cpx: number): void {
        this.state.scrollPosition_cpx = cpx;
        this.updateScrollIndicator();
    }

    public debouncedSetSearchResults = debounce(
        (searchResults: Set<string>) => {
            drawMinimapWorker.run({
                type: 'minimap/set/search-results',
                payload: {
                    canvasId: this.props.canvasId,
                    searchResults,
                },
            });
        },
        100,
    );

    private updateScrollIndicator(): void {
        if (!this.enabled) return;
        debouncedUpdateScrollIndicator(this.state, this.getDom());
    }

    private scrollCardIntoView = async () => {
        if (!this.enabled) return;

        const activeCardRange =
            this.state.ranges.cards[this.props.activeCardId];
        if (!activeCardRange) return;
        const delta_cpx = calculateScrollDeltaToActiveCard(
            activeCardRange.y_start,
            activeCardRange.y_end,
            this.state.totalDrawnHeight_cpx,
            this.state.scrollPosition_cpx,
            this.getDom(),
        );
        if (typeof delta_cpx === 'number') {
            this.setScrollPosition(delta_cpx);
        } else {
            this.updateScrollIndicator();
        }
    };

    private debouncedScrollCardIntoView = debounce(this.scrollCardIntoView, 16);

    initializeWorker = async (theme: MinimapTheme): Promise<void> => {
        if (this.state.initialized) return;
        if (!this.props.dom) return;

        await drawMinimapWorker.run(
            {
                type: 'worker/initialize',
                payload: {
                    canvas: this.props.dom.offscreen,
                    canvasId: this.props.canvasId,
                    theme,
                },
            },
            this.props.dom?.offscreen,
        );

        this.state.initialized = true;
    };

    destroyWorker = () => {
        this.state.initialized = false;
        drawMinimapWorker.run({
            type: 'worker/destroy',
            payload: { canvasId: this.props.canvasId },
        });
    };
}
