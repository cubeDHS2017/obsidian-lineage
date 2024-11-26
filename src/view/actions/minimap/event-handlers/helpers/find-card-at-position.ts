import { CardRanges } from 'src/view/actions/minimap/minimap';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

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
