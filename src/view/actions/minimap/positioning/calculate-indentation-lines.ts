import {
    INDENT_BLOCK_TOTAL_WIDTH_CPX,
    INDENT_BLOCK_WIDTH_CPX,
    LINE_GAP_CPX,
    LINE_HEIGHT_CPX,
} from 'src/view/actions/minimap/constants';
import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';

export type IndentationLine = {
    x_px: number;
    y_px: number;
    height_px: number;
    width_px: number;
    cardId: string;
};

export const calculateIndentationLines = (wordBlocks: WordBlock[]) => {
    const wordBlocksByLine: { [key: number]: WordBlock[] } = {};
    wordBlocks.forEach((wordBlock) => {
        if (!wordBlocksByLine[wordBlock.line]) {
            wordBlocksByLine[wordBlock.line] = [];
        }
        wordBlocksByLine[wordBlock.line].push(wordBlock);
    });
    const lines: IndentationLine[] = [];
    const lineNumber_wordBlocks = Object.entries(wordBlocksByLine);

    for (let i = 0; i < lineNumber_wordBlocks.length; i++) {
        const [lineNumber, lineWordBlocks] = lineNumber_wordBlocks[i];
        const y = +lineNumber * LINE_HEIGHT_CPX;
        const lineDepth = lineWordBlocks[0].depth;
        const next_lineNumber_WordBlocks = lineNumber_wordBlocks[i + 1];
        let lastLineOfCard = true;
        if (next_lineNumber_WordBlocks) {
            const nextCardId = next_lineNumber_WordBlocks[1][0].cardId;
            if (nextCardId === lineWordBlocks[0].cardId) {
                lastLineOfCard = false;
            }
        }

        for (let depth = 0; depth < lineDepth; depth++) {
            const x = depth * INDENT_BLOCK_TOTAL_WIDTH_CPX;

            lines.push({
                x_px: x,
                y_px: y,
                height_px:
                    LINE_HEIGHT_CPX - (lastLineOfCard ? LINE_GAP_CPX : 0),
                width_px: INDENT_BLOCK_WIDTH_CPX,
                cardId: lineWordBlocks[0].cardId,
            });
        }
    }
    return lines;
};
