import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export const findCardAtPosition = (
    y: number,
    ranges: CardRanges,
    margin = LINE_HEIGHT_CPX,
) => {
    const result = Object.values(ranges).find(
        (range) => y >= range.y_start - margin && y <= range.y_end + margin,
    );
    return result?.cardId;
};
