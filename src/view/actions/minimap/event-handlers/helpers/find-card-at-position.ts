import { CardRanges } from 'src/view/actions/minimap/minimap';

export const findCardAtPosition = (y: number, ranges: CardRanges) => {
    const result = Object.values(ranges).find(
        (range) => y >= range.y_start && y <= range.y_end,
    );
    return result?.cardId;
};
