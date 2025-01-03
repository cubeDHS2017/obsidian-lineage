import { HORIZONTAL_PADDING } from 'src/lib/align-element/constants';

export const calculateScrollLeft = (
    elementRect: DOMRect,
    containerRect: DOMRect,
    center: boolean,
    scrollToTheLeft = false,
) => {
    const viewPortIsWideEnough = containerRect.width > elementRect.width;

    const deltaRight =
        containerRect.right - HORIZONTAL_PADDING - elementRect.right;

    const deltaLeft =
        containerRect.left + HORIZONTAL_PADDING - elementRect.left;
    const leftSideIsVisible = deltaLeft < 0;
    const rightSideIsVisible = deltaRight > 0;

    let scrollLeft = 0;
    if (!viewPortIsWideEnough) {
        scrollLeft = deltaLeft;
    } else if (center) {
        const horizontalMiddle = containerRect.left + containerRect.width / 2;
        const elementMiddle = elementRect.left + elementRect.width / 2;
        scrollLeft = horizontalMiddle - elementMiddle;
    } else if (!leftSideIsVisible || scrollToTheLeft) {
        scrollLeft = deltaLeft;
    } else if (!rightSideIsVisible) {
        scrollLeft = deltaRight;
    }
    return scrollLeft;
};
