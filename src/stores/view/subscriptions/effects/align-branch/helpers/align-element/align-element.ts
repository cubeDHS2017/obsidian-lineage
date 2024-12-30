import { getCombinedBoundingClientRect } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-combined-client-rect';
import { ScrollingSettings } from 'src/stores/settings/settings-type';
import { calculateScrollTop } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/helpers/calculate-scroll-top';
import { calculateScrollLeft } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/helpers/calculate-scroll-left';

export type AlignBranchState = { columns: Set<string> };

export const THRESHOLD = 5;

export const alignElement = (
    container: HTMLElement,
    elements: HTMLElement | HTMLElement[],
    behavior: ScrollBehavior = 'smooth',
    mode: 'vertical' | 'horizontal' | 'both' = 'vertical',
    settings: ScrollingSettings,
    zoomLevel = 1,
    horizontalChild?: HTMLElement,
    scrollToTheLeft = false,
) => {
    if (!container) return;
    const isArray = Array.isArray(elements);
    const element = isArray ? elements[0] : elements;
    if (!element) return;
    const column = element.matchParent('.column') as HTMLElement;

    if (column) {
        const elementRect = isArray
            ? getCombinedBoundingClientRect(elements)
            : element.getBoundingClientRect();
        const containerRect = (
            container.parentElement as HTMLElement
        ).getBoundingClientRect();

        if (mode === 'horizontal' || mode === 'both') {
            const childRect = horizontalChild
                ? horizontalChild.getBoundingClientRect()
                : null;
            const scrollLeft = calculateScrollLeft(
                elementRect,
                containerRect,
                settings,
                childRect,
                scrollToTheLeft,
            );
            if (Math.abs(scrollLeft) > THRESHOLD)
                container.scrollBy({
                    left: scrollLeft * -1,
                    behavior,
                });
        }

        if (mode === 'vertical' || mode === 'both') {
            const scrollTop = calculateScrollTop(elementRect, containerRect);
            if (Math.abs(scrollTop) > THRESHOLD)
                column.scrollBy({
                    top: (scrollTop * -1) / zoomLevel,
                    behavior,
                });
        }

        return column.id;
    }
};
