import { calculateWordPositions } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-word-positions';
import {
    INDENT_BLOCK_TOTAL_WIDTH,
    N_CHARS_OF_INDENT,
    N_CHARS_PER_LINE,
    N_PIXELS_OF_LINE_GAP,
    N_PIXELS_OF_LINE_HEIGHT,
    N_PIXELS_OF_WORD_CHAR,
} from 'src/view/actions/minimap/constants';
import { ExtendedTreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';

export type WordBlock = {
    cardId: string;
    depth: number;
    line: number;
    x_px: number;
    y_px: number;
    width_px: number;
    height_px: number;
    empty: boolean;
};

function calculateWordBlocksOfCard(
    node: ExtendedTreeNode,
    state: { nextLineOffset: number; nextNodeIndex: number; depth: number },
) {
    const wordBlocks: WordBlock[] = [];
    const availableLineCharacters =
        N_CHARS_PER_LINE - state.depth * N_CHARS_OF_INDENT;
    const wordPositions = calculateWordPositions(
        node.content,
        availableLineCharacters,
    );

    for (const wordPos of wordPositions.words) {
        wordBlocks.push({
            cardId: node.id,
            line: state.nextLineOffset + wordPos.lineNumber,
            depth: state.depth,
            height_px: N_PIXELS_OF_LINE_HEIGHT - N_PIXELS_OF_LINE_GAP,
            width_px: wordPos.lengthInChars * N_PIXELS_OF_WORD_CHAR,
            x_px:
                state.depth * INDENT_BLOCK_TOTAL_WIDTH +
                wordPos.xInChars * N_PIXELS_OF_WORD_CHAR,
            y_px:
                N_PIXELS_OF_LINE_HEIGHT *
                (state.nextLineOffset + wordPos.lineNumber),
            empty: wordPositions.empty,
        });
    }

    state.nextLineOffset = state.nextLineOffset + wordPositions.totalLines + 1;
    state.nextNodeIndex = state.nextNodeIndex + 1;

    const currentDepth = state.depth;
    state.depth = currentDepth + 1;
    for (const child of node.children) {
        const wordBlocksOfCard = calculateWordBlocksOfCard(child, state);
        wordBlocks.push(...wordBlocksOfCard);
    }
    state.depth = currentDepth;
    return wordBlocks;
}

export const calculateWordBlocks = (nodes: ExtendedTreeNode[]) => {
    const wordBlocks: WordBlock[] = [];
    const state = {
        nextLineOffset: 0,
        nextNodeIndex: 0,
        depth: 0,
    };
    for (const node of nodes) {
        wordBlocks.push(...calculateWordBlocksOfCard(node, state));
    }
    return { wordBlocks, totalLines: state.nextLineOffset + 1 };
};
