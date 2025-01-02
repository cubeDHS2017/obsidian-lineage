import { getCombinedBoundingClientRect } from 'src/lib/align-element/helpers/get-combined-client-rect';
import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';
import { ScrollingMode } from 'src/stores/settings/settings-type';
import { THRESHOLD } from 'src/lib/align-element/constants';

export const alignGroupOfElementsVertically = (
    container: HTMLElement,
    elements: HTMLElement[],
    zoomLevel: number,
    mode: ScrollingMode | null,
    behavior: ScrollBehavior = 'smooth',
) => {
    const column = elements[0].matchParent('.column') as HTMLElement;
    if (!column) return;
    const elementRect = getCombinedBoundingClientRect(elements);

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
