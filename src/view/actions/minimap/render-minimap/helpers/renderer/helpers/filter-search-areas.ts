import { CardRange } from 'src/view/actions/minimap/minimap-controller';

export const filterSearchAreas = (
    previousSearchRanges: CardRange[],
    nextSearchRanges: CardRange[],
    previousActiveNode: CardRange,
    nextActiveCardRange: CardRange,
) => {
    if (previousSearchRanges.length === 0 || nextSearchRanges.length === 0) {
        return {
            nextSearchResultRanges: nextSearchRanges,
            previousSearchResultRanges: previousSearchRanges,
        };
    }
    const previousSet = new Set(previousSearchRanges);
    const nextSet = new Set(nextSearchRanges);

    const filteredPrevious = previousSearchRanges.filter((area) => {
        return (
            area === previousActiveNode ||
            area === nextActiveCardRange ||
            !nextSet.has(area)
        );
    });

    const filteredNext = previousSearchRanges.filter((area) => {
        return (
            area === previousActiveNode ||
            area === nextActiveCardRange ||
            !previousSet.has(area)
        );
    });

    return {
        nextSearchResultRanges: filteredNext,
        previousSearchResultRanges: filteredPrevious,
    };
};
