import {
    calculateWordBlocks,
    MinimapLine,
} from 'src/view/actions/minimap/render-minimap/helpers/shapes/calculate-word-blocks';
import { calculateIndentationLines } from 'src/view/actions/minimap/render-minimap/helpers/shapes/calculate-indentation-lines';
import {
    CardRange,
    CardRanges,
} from 'src/view/actions/minimap/minimap-controller';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { columnsToExtendedJson } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { createYRangeMap } from 'src/view/actions/minimap/render-minimap/helpers/shapes/create-y-range-map';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

export class ShapesAndRanges {
    getSearchResultRanges() {
        return this.searchResultRanges;
    }
    private lines: MinimapLine[] = [];
    private totalLines: number = 0;
    private cardRanges: CardRanges = {};
    private searchResultRanges: CardRange[] = [];

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

    updateSearchResultRanges(searchResults: Set<string>) {
        this.searchResultRanges = Array.from(searchResults).map(
            (id) => this.cardRanges[id],
        );
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
