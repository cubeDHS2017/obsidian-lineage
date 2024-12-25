import { MinimapLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export const createYRangeMap = (lines: MinimapLine[]) => {
    const rangeMap: CardRanges = {};

    for (const line of lines) {
        const y_start = line.y_px;
        const y_end = line.y_px + LINE_HEIGHT_CPX;

        if (rangeMap[line.nodeId]) {
            rangeMap[line.nodeId] = {
                y_start: Math.min(y_start, rangeMap[line.nodeId].y_start),
                y_end: Math.max(y_end, rangeMap[line.nodeId].y_end),
                cardId: line.nodeId,
            };
        } else {
            rangeMap[line.nodeId] = { y_start, y_end, cardId: line.nodeId };
        }
    }

    return rangeMap;
};
