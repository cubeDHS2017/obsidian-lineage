import { ScrollingMode } from 'src/stores/settings/settings-type';
import { VERTICAL_PADDING } from 'src/lib/align-element/constants';

export const calculateScrollTop = (
    elementRect: DOMRect,
    containerRect: DOMRect,
    mode: ScrollingMode | null,
) => {
    const viewPortIsTallEnough = containerRect.height >= elementRect.height;
    const deltaTop = containerRect.top + VERTICAL_PADDING - elementRect.top;

    const deltaBottom =
        containerRect.bottom - VERTICAL_PADDING - elementRect.bottom;
    const bottomIsVisible = deltaBottom > 0;
    const topIsVisible = deltaTop < 0;

    let scrollTop = 0;
    if (!viewPortIsTallEnough) {
        scrollTop = deltaTop;
    }
    if (mode === 'reveal-active-card') {
        if (!topIsVisible) {
            scrollTop = deltaTop;
        } else if (!bottomIsVisible) {
            scrollTop = deltaBottom;
        }
    } else {
        const verticalMiddle = containerRect.height / 2;
        scrollTop =
            verticalMiddle -
            (elementRect.top - containerRect.top + elementRect.height / 2);
    }
    return scrollTop;
};
