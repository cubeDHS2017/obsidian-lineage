export const getVerticalBuffer = (direction: number, column: HTMLElement) => {
    if (direction === -1) {
        return column.firstElementChild as HTMLElement | null;
    } else return column.lastElementChild as HTMLElement | null;
};
