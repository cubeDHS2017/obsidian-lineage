import {
    calculateWordBlocks,
    WordBlock,
} from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import {
    calculateIndentationLines,
    IndentationLine,
} from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import {
    CardRange,
    CardRanges,
} from 'src/view/actions/minimap/minimap-controller';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { columnsToExtendedJson } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { createYRangeMap } from 'src/view/actions/minimap/positioning/create-y-range-map';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

export class ShapesAndRanges {
    getSearchResultRanges() {
        return this.searchResultRanges;
    }
    private wordBlocks: WordBlock[] = [];
    private indentationLines: IndentationLine[] = [];
    private totalLines: number = 0;
    private cardRanges: CardRanges = {};
    private searchResultRanges: CardRange[] = [];

    calculateDocument(document: LineageDocument) {
        const tree = columnsToExtendedJson(document.columns, document.content);
        const blocks = calculateWordBlocks(tree);

        this.wordBlocks = blocks.wordBlocks;
        this.totalLines = blocks.totalLines;
        this.indentationLines = calculateIndentationLines(this.wordBlocks);

        this.cardRanges = createYRangeMap(this.wordBlocks);

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

    getWordBlocks() {
        return this.wordBlocks;
    }

    getIndentationLines() {
        return this.indentationLines;
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
