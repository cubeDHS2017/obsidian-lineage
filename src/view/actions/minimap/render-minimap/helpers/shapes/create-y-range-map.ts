import { CardRanges } from 'src/view/actions/minimap/minimap-controller';
import { MinimapLine } from 'src/view/actions/minimap/render-minimap/helpers/shapes/calculate-word-blocks';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

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
