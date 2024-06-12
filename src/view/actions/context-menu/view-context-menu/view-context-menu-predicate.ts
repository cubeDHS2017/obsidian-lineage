export const viewContextMenuPredicate = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement;
    return (
        target.hasClass('column-buffer') ||
        target.hasClass('columns') ||
        target.hasClass('columns-container')
    );
};
