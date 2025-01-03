import { calculateScrollLeft } from 'src/lib/align-element/helpers/calculate-scroll-left';

import { THRESHOLD } from 'src/lib/align-element/constants';

export const alignElementHorizontally = (
    container: HTMLElement,
    element: HTMLElement,
    center: boolean,
    behavior: ScrollBehavior = 'smooth',
    scrollToTheLeft = false,
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
        center,
        scrollToTheLeft,
    );
    if (Math.abs(scrollLeft) > THRESHOLD)
        container.scrollBy({
            left: scrollLeft * -1,
            behavior,
        });

    return column.id;
};
