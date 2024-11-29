const VERTICAL_PADDING = 20;

export const calculateScrollTop = (
    elementRect: DOMRect,
    containerRect: DOMRect,
) => {
    const viewPortIsTallEnough = containerRect.height >= elementRect.height;
    const deltaTop = containerRect.top + VERTICAL_PADDING - elementRect.top;

    let scrollTop = 0;
    if (!viewPortIsTallEnough) {
        scrollTop = deltaTop;
    } else {
        const verticalMiddle = containerRect.height / 2;
        scrollTop =
            verticalMiddle -
            (elementRect.top - containerRect.top + elementRect.height / 2);
    }
    return scrollTop;
};
