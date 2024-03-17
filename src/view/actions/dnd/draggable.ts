import { ViewStore } from 'src/view/view';

const toggleDraggedNodeVisibility = (
    node: HTMLElement,
    data: DraggableData,
    visible: boolean,
) => {
    requestAnimationFrame(() => {
        const parent = node.matchParent('#' + data.id) as HTMLElement;
        if (parent) {
            parent.style.display = visible ? 'flex' : 'none';
        }
    });
};

export type DraggableData = {
    id: string;
    store: ViewStore;
};

export const draggable = (node: HTMLElement, data: DraggableData) => {
    node.draggable = true;

    const handleDragstart = (event: DragEvent) => {
        if (!event.dataTransfer) return;
        const target = event.currentTarget as HTMLElement;
        if (
            event.clientX - target.getBoundingClientRect().x <= 12 ||
            target.dataset['test'] === 'true'
        ) {
            event.dataTransfer.setData('text/plain', data.id);
            setTimeout(() => {
                data.store.dispatch({
                    type: 'SET_DRAG_STARTED',
                    payload: { nodeId: data.id },
                });
                toggleDraggedNodeVisibility(node, data, false);
            }, 0);
        } else {
            event.preventDefault();
        }
    };

    node.addEventListener('dragstart', handleDragstart);
    const handleDragEnd = () => {
        data.store.dispatch({ type: 'DOCUMENT/SET_DRAG_STARTED' });
        toggleDraggedNodeVisibility(node, data, true);
    };
    node.addEventListener('dragend', handleDragEnd);

    return {
        destroy: () => {
            node.removeEventListener('dragstart', handleDragstart);
            node.removeEventListener('dragend', handleDragEnd);
        },
    };
};
