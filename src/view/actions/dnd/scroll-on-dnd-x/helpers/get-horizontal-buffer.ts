export const getHorizontalBuffer = (
    container: HTMLElement,
    direction: number,
) => {
    const columnsWrapper = container.firstElementChild;
    if (!columnsWrapper) return null;
    return (
        direction === -1
            ? columnsWrapper.firstElementChild
            : columnsWrapper.lastElementChild
    ) as HTMLElement | null;
};
