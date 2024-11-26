import {
    calculateWordPositions,
    ChunkType,
} from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-word-positions';
import {
    CHAR_WIDTH_CPX,
    INDENT_BLOCK_TOTAL_WIDTH_CPX,
    LINE_GAP_CPX,
    LINE_HEIGHT_CPX,
    N_CHARS_OF_INDENT,
    N_CHARS_PER_LINE,
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
    chunkType: ChunkType | null;
};

const calculateWordBlocksOfCard = (
    node: ExtendedTreeNode,
    state: { nextLineOffset: number; depth: number },
) => {
    const wordBlocks: WordBlock[] = [];
    const availableLineCharacters =
        N_CHARS_PER_LINE - state.depth * N_CHARS_OF_INDENT * 2;
    const wordPositions = calculateWordPositions(
        node.content,
        availableLineCharacters,
    );

    for (const wordPos of wordPositions.words) {
        wordBlocks.push({
            cardId: node.id,
            line: state.nextLineOffset + wordPos.lineNumber,
            depth: state.depth,
            height_px: LINE_HEIGHT_CPX - LINE_GAP_CPX,
            width_px: wordPos.lengthInChars * CHAR_WIDTH_CPX,
            x_px:
                state.depth * INDENT_BLOCK_TOTAL_WIDTH_CPX +
                wordPos.xInChars * CHAR_WIDTH_CPX,
            y_px: LINE_HEIGHT_CPX * (state.nextLineOffset + wordPos.lineNumber),
            empty: wordPositions.empty,
            chunkType: wordPos.chunkType,
        });
    }

    state.nextLineOffset = state.nextLineOffset + wordPositions.totalLines + 1;

    const currentDepth = state.depth;
    state.depth = currentDepth + 1;
    for (const child of node.children) {
        const wordBlocksOfCard = calculateWordBlocksOfCard(child, state);
        wordBlocks.push(...wordBlocksOfCard);
    }
    state.depth = currentDepth;
    return wordBlocks;
};

export type WordBlocksResult = { totalLines: number; wordBlocks: WordBlock[] };
export const calculateWordBlocks: (
    nodes: ExtendedTreeNode[],
) => WordBlocksResult = (nodes: ExtendedTreeNode[]) => {
    const wordBlocks: WordBlock[] = [];
    const state = {
        nextLineOffset: 1, // keep an empty line at the start for card focus rectangle
        depth: 0,
    };
    for (const node of nodes) {
        wordBlocks.push(...calculateWordBlocksOfCard(node, state));
    }
    return {
        wordBlocks,
        totalLines: state.nextLineOffset + 2, // add an additional line for card focus rectangle
    };
};
