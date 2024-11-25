import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { CardRanges } from 'src/view/actions/minimap/minimap';

export const createYRangeMap = (wordBlocks: WordBlock[]) => {
    const rangeMap: CardRanges = {};

    for (const block of wordBlocks) {
        const y_start = block.y_px;
        const y_end = block.y_px + block.height_px;

        if (rangeMap[block.cardId]) {
            rangeMap[block.cardId] = {
                y_start: Math.min(y_start, rangeMap[block.cardId].y_start),
                y_end: Math.max(y_end, rangeMap[block.cardId].y_end),
                cardId: block.cardId,
            };
        } else {
            rangeMap[block.cardId] = { y_start, y_end, cardId: block.cardId };
        }
    }

    return rangeMap;
};
