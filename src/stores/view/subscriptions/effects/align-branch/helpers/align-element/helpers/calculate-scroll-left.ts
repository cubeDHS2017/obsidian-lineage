import { ScrollingSettings } from 'src/stores/settings/settings-type';

const HORIZONTAL_PADDING = 100;

export const calculateScrollLeft = (
    elementRect: DOMRect,
    containerRect: DOMRect,
    settings: ScrollingSettings,
    childRect?: DOMRect | null,
) => {
    const viewPortIsWideEnough = containerRect.width > elementRect.width;
    const viewPortIsWideEnoughForChild = childRect
        ? containerRect.width >
          childRect.right - elementRect.left + HORIZONTAL_PADDING
        : true;
    const deltaRight =
        containerRect.right - HORIZONTAL_PADDING - elementRect.right;
    const deltaRightOfChild = !childRect
        ? 0
        : containerRect.right - HORIZONTAL_PADDING - childRect.right;
    const deltaLeft =
        containerRect.left + HORIZONTAL_PADDING - elementRect.left;
    const leftSideIsVisible = deltaLeft < 0;
    const rightSideIsVisible = deltaRight > 0;
    const rightSideOfChildIsVisible = !childRect || deltaRightOfChild > 0;
    let scrollLeft = 0;
    if (!viewPortIsWideEnough) {
        scrollLeft = deltaLeft;
    } else if (
        settings.horizontalScrollingMode === 'keep-active-card-at-center'
    ) {
        const horizontalMiddle = containerRect.left + containerRect.width / 2;
        const elementMiddle = elementRect.left + elementRect.width / 2;
        scrollLeft = horizontalMiddle - elementMiddle;
    } else if (!leftSideIsVisible) {
        scrollLeft = deltaLeft;
    } else if (
        settings.horizontalScrollingMode === 'reveal-active-card' &&
        settings.revealChildren &&
        !rightSideOfChildIsVisible
    ) {
        if (viewPortIsWideEnoughForChild) {
            scrollLeft = deltaRightOfChild;
        } else {
            scrollLeft = deltaLeft;
        }
    } else if (!rightSideIsVisible) {
        scrollLeft = deltaRight;
    }
    return scrollLeft;
};
