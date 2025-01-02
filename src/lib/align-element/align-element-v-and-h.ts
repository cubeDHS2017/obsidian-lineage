import { ScrollingMode } from 'src/stores/settings/settings-type';
import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';
import { calculateScrollLeft } from 'src/lib/align-element/helpers/calculate-scroll-left';

import { THRESHOLD } from 'src/lib/align-element/constants';

export type AlignBranchState = { columns: Set<string> };

export const alignElementVAndH = (
    container: HTMLElement,
    element: HTMLElement,
    behavior: ScrollBehavior = 'smooth',
    zoomLevel: number,
    horizontalMode: ScrollingMode | null,
    verticalMode: ScrollingMode | null,
) => {
    const column = element.matchParent('.column') as HTMLElement;

    if (!column) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = (
        container.parentElement as HTMLElement
    ).getBoundingClientRect();

    const scrollLeft = calculateScrollLeft(
        elementRect,
        containerRect,
        horizontalMode,
        false,
    );
    if (Math.abs(scrollLeft) > THRESHOLD)
        container.scrollBy({
            left: scrollLeft * -1,
            behavior,
        });

    const scrollTop = calculateScrollTop(
        elementRect,
        containerRect,
        verticalMode,
    );
    if (Math.abs(scrollTop) > THRESHOLD)
        column.scrollBy({
            top: (scrollTop * -1) / zoomLevel,
            behavior,
        });

    return column.id;
};
