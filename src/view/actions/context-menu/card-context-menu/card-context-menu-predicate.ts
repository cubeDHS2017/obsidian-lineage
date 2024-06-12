export const cardContextMenuPredicate = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLElement;
    return (
        !target.hasClass('drag-handle') &&
        Boolean(target.closest('.active-node.node-border--active'))
    );
};
