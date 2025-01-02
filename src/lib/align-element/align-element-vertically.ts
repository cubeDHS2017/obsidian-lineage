import { ScrollingMode } from 'src/stores/settings/settings-type';
import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';

import { THRESHOLD } from 'src/lib/align-element/constants';

export const alignElementVertically = (
    container: HTMLElement,
    element: HTMLElement,
    zoomLevel: number,
    mode: ScrollingMode | null,
    behavior: ScrollBehavior = 'smooth',
) => {
    if (!container) return;
    const column = element.matchParent('.column') as HTMLElement;

    if (!column) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = (
        container.parentElement as HTMLElement
    ).getBoundingClientRect();

    const scrollTop = calculateScrollTop(elementRect, containerRect, mode);
    if (Math.abs(scrollTop) > THRESHOLD)
        column.scrollBy({
            top: (scrollTop * -1) / zoomLevel,
            behavior,
        });

    return column.id;
};
