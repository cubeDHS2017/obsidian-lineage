import {
    calculateWordBlocks,
    WordBlock,
} from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { N_PIXELS_OF_LINE_HEIGHT } from 'src/view/actions/minimap/constants';
import { debouncedRenderMinimap } from 'src/view/actions/minimap/render-minimap/render-minimap';
import { debouncedUpdateScrollIndicator } from 'src/view/actions/minimap/scroll-indicator/update-scroll-indicator';
import {
    columnsToExtendedJson,
    ExtendedTreeNode,
} from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { LineageDocument } from 'src/stores/document/document-state-type';
import {
    calculateIndentationLines,
    IndentationLine,
} from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import { createYRangeMap } from 'src/view/actions/minimap/event-handlers/helpers/create-y-range-map';
import { calculateScrollDeltaToActiveCard } from 'src/view/actions/minimap/scroll-indicator/calculate-scroll-delta-to-active-card';
import invariant from 'tiny-invariant';
import { updateMinimapColors } from 'src/view/actions/minimap/minimap-colors';
import { onCanvasClick } from 'src/view/actions/minimap/event-handlers/on-canvas-click';
import { onCanvasWheel } from 'src/view/actions/minimap/event-handlers/on-canvas-wheel';
import { LineageView } from 'src/view/view';

export type MinimapProps = {
    activeCardId: string;
    tree: ExtendedTreeNode[];
    dom: MinimapDomElements | null;
};

export type CardRanges = {
    [cardId: string]: {
        y_start: number;
        y_end: number;
        cardId: string;
    };
};

export type MinimapState = {
    scrollPosition_cpx: number;
    totalDrawnHeight_cpx: number;
    totalLines: number;
    shapes: {
        wordBlocks: WordBlock[];
        indentationLines: IndentationLine[];
    };
    ranges: {
        cards: CardRanges;
    };
};

export type MinimapDomElements = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    scrollIndicator: HTMLElement;
};

export class Minimap {
    private props: MinimapProps = {
        tree: [],
        activeCardId: '',
        dom: null,
    };

    private state: MinimapState = {
        scrollPosition_cpx: 0,
        totalDrawnHeight_cpx: 0,
        totalLines: 0,
        shapes: {
            wordBlocks: [],
            indentationLines: [],
        },
        ranges: {
            cards: {},
        },
    };
    private subscriptions: Set<() => void> = new Set();

    public constructor(private view: LineageView) {}

    private get enabled() {
        return Boolean(this.props.dom);
    }

    public getDom(): MinimapDomElements {
        invariant(this.props.dom);
        return this.props.dom;
    }

    public getState(): MinimapState {
        return this.state;
    }

    public onLoad(container: HTMLElement): void {
        const scrollIndicator = container.querySelector(
            '#scrollIndicator',
        ) as HTMLElement;
        const canvas = container.querySelector('canvas');
        invariant(canvas);
        invariant(scrollIndicator);
        const ctx = canvas.getContext('2d');
        invariant(ctx);
        updateMinimapColors();
        this.props.dom = {
            ctx,
            canvas,
            scrollIndicator,
        };

        const onClick = (e: MouseEvent) => {
            onCanvasClick(e, this.view);
        };
        const onWheel = (e: WheelEvent) => onCanvasWheel(e, this.view);

        canvas.addEventListener('click', onClick);
        container.addEventListener('wheel', onWheel);

        this.setDocument(this.view.documentStore.getValue().document);
        this.setActiveCardId(
            this.view.viewStore.getValue().document.activeNode,
        );
        this.subscriptions.add(() => {
            canvas.removeEventListener('click', onClick);
            container.removeEventListener('wheel', onWheel);
        });
    }

    public onUnload() {
        for (const unsub of this.subscriptions) {
            unsub();
        }
        this.props.dom = null;
    }

    public setDocument(lineageDocument: LineageDocument): void {
        if (!this.enabled) return;
        const tree = columnsToExtendedJson(
            lineageDocument.columns,
            lineageDocument.content,
        );
        const blocks = calculateWordBlocks(tree);

        this.state.shapes.wordBlocks = blocks.wordBlocks;
        this.state.totalLines = blocks.totalLines;
        this.state.shapes.indentationLines = calculateIndentationLines(
            blocks.wordBlocks,
        );

        this.state.ranges.cards = createYRangeMap(this.state.shapes.wordBlocks);

        this.state.totalDrawnHeight_cpx =
            blocks.totalLines * N_PIXELS_OF_LINE_HEIGHT;
        this.render();
    }

    public setActiveCardId(nodeId: string): void {
        if (!nodeId) return;
        if (nodeId === this.props.activeCardId) return;
        this.props.activeCardId = nodeId;
        this.render();
    }

    public setScrollPosition(cpx: number): void {
        this.state.scrollPosition_cpx = cpx;
        this.updateScrollIndicator();
    }

    private render(): void {
        if (!this.enabled) return;
        debouncedRenderMinimap(this.state, this.props, this.getDom());
        this.scrollCardIntoView();
    }

    private updateScrollIndicator(): void {
        if (!this.enabled) return;
        debouncedUpdateScrollIndicator(this.state, this.getDom());
    }

    private scrollCardIntoView() {
        if (!this.enabled) return;
        const card = this.state.ranges.cards[this.props.activeCardId];
        if (!card) return;
        const delta_cpx = calculateScrollDeltaToActiveCard(
            card.y_start,
            card.y_end,
            this.state,
            this.getDom(),
        );
        if (typeof delta_cpx === 'number') {
            this.setScrollPosition(delta_cpx);
        } else {
            this.updateScrollIndicator();
        }
    }
}
