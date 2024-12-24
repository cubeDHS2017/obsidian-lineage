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
import { Writable, writable } from 'svelte/store';

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

export type ScrollInfo = {
    scrollPosition_cpx: number;
    totalDrawnHeight_cpx: number;
};
export type MinimapState = {
    scrollInfo: ScrollInfo;
    initialized: boolean;
    ranges: {
        cards: CardRanges;
        cardsStore: Writable<CardRanges>;
    };
};

export type MinimapDomElements = {
    canvas: HTMLCanvasElement;
    scrollIndicator: HTMLElement;
    offscreen: OffscreenCanvas;
    canvasContainer: HTMLElement;
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
        scrollInfo: {
            scrollPosition_cpx: 0,
            totalDrawnHeight_cpx: 0,
        },
        initialized: false,
        ranges: {
            cards: {},
            cardsStore: writable({}),
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

    public async onLoad(container: HTMLElement) {
        this.view.contentEl.addClass('lineage-view__content-el--minimap-on');
        const scrollIndicator = container.querySelector(
            '#scrollIndicator',
        ) as HTMLElement;
        const canvas = container.querySelector('canvas');
        const canvasContainer = container.querySelector(
            '.canvas-container',
        ) as HTMLElement | null;
        invariant(canvas);
        invariant(scrollIndicator);
        invariant(canvasContainer);
        canvas.width = CANVAS_WIDTH_CPX;
        refreshMinimapTheme();
        const offscreen = canvas.transferControlToOffscreen();
        this.props.isLightTheme = getTheme() === 'light';
        this.props.canvasId = id.canvas();

        this.props.dom = {
            offscreen,
            canvas,
            scrollIndicator,
            canvasContainer: canvasContainer,
        };
        await this.initializeWorker(minimapTheme.current);

        const onClick = (e: MouseEvent) => {
            onCanvasClick(e, this.view);
        };
        const onWheel = (e: WheelEvent) => onCanvasWheel(e, this.view);

        const onMousemove = createOnCanvasMousemove(this.view);

        canvasContainer.addEventListener('click', onClick);
        container.addEventListener('wheel', onWheel);
        container.addEventListener('mousemove', onMousemove);

        this.props.activeCardId =
            this.view.viewStore.getValue().document.activeNode;
        this.debouncedSetDocument(this.view.documentStore.getValue().document);

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

            this.updateCardRanges(payload.cardRanges);
            this.state.scrollInfo.totalDrawnHeight_cpx =
                payload.totalDrawnHeight_cpx;
            this.debouncedScrollCardIntoView();
        },
        100,
    );

    private updateCardRanges = (cardRanges: CardRanges) => {
        this.state.ranges.cardsStore.set(cardRanges);
        this.state.ranges.cards = cardRanges;
    };

    public setScrollPosition(cpx: number): void {
        this.state.scrollInfo.scrollPosition_cpx = cpx;
        this.updateScrollIndicator();
    }

    onActiveNodeUpdate = (activeCardId: string) => {
        this.props.activeCardId = activeCardId;
        this.debouncedScrollCardIntoView();
    };
    private updateScrollIndicator(): void {
        if (!this.enabled) return;
        debouncedUpdateScrollIndicator(this.state.scrollInfo, this.getDom());
    }

    private debouncedScrollCardIntoView = debounce(() => {
        if (!this.enabled) return;

        const activeCardRange =
            this.state.ranges.cards[this.props.activeCardId];
        if (!activeCardRange) return;
        const delta_cpx = calculateScrollDeltaToActiveCard(
            activeCardRange.y_start,
            activeCardRange.y_end,
            this.state.scrollInfo.totalDrawnHeight_cpx,
            this.state.scrollInfo.scrollPosition_cpx,
            this.getDom(),
        );
        if (typeof delta_cpx === 'number') {
            this.setScrollPosition(delta_cpx);
        } else {
            this.updateScrollIndicator();
        }
    }, 16);

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

    getCardRangesStore = (): Writable<CardRanges> => {
        return this.state.ranges.cardsStore;
    };

    getCardRanges = (): CardRanges => {
        return this.state.ranges.cards;
    };

    getScrollInfo = (): MinimapState['scrollInfo'] => {
        return this.state.scrollInfo;
    };
}
