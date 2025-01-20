import {
    calculateWordBlocks,
    MinimapLine,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { calculateIndentationLines } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-indentation-lines';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { columnsToExtendedJson } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { createYRangeMap } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/create-y-range-map';
import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export class ShapesAndRanges {
    private lines: MinimapLine[] = [];
    private totalLines: number = 0;
    private cardRanges: CardRanges = {};

    calculateDocument(document: LineageDocument, canvasId: string) {
        const tree = columnsToExtendedJson(document.columns, document.content);
        const blocks = calculateWordBlocks(tree, canvasId);

        this.lines = blocks.lines;
        this.totalLines = blocks.totalLines;
        calculateIndentationLines(blocks.lines);

        this.cardRanges = createYRangeMap(this.lines);

        return {
            totalLines: this.totalLines,
            totalDrawnHeight_cpx: this.totalLines * LINE_HEIGHT_CPX,
            cardRanges: this.cardRanges,
        };
    }

    getLines() {
        return this.lines;
    }

    getTotalLines() {
        return this.totalLines;
    }

    getCardRange(cardId: string) {
        return this.cardRanges[cardId];
    }

    getCardRanges() {
        return this.cardRanges;
    }
}
