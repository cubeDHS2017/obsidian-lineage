import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';

export const findWordblockById = (wordBlocks: WordBlock[], id: string) => {
    return wordBlocks.find((node) => node.cardId === id);
};
