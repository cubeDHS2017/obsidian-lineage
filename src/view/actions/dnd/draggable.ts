import { DocumentStore, ViewStore } from 'src/view/view';
import { traverseDown } from 'src/lib/tree-utils/get/traverse-down';

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
    documentStore: DocumentStore;
    viewStore: ViewStore;
    isInSidebar: boolean;
};

export const draggable = (node: HTMLElement, data: DraggableData) => {
    if (data.isInSidebar) return;
    node.draggable = true;

    const handleDragstart = (event: DragEvent) => {
        if (!event.dataTransfer) return;
        const target = event.currentTarget as HTMLElement;
        if (
            event.clientX - target.getBoundingClientRect().x <= 7 ||
            target.dataset['test'] === 'true'
        ) {
            event.dataTransfer.setData('text/plain', data.id);
            setTimeout(() => {
                const childGroups = traverseDown(
                    data.documentStore.getValue().document.columns,
                    data.id,
                    false,
                );
                data.viewStore.dispatch({
                    type: 'SET_DRAG_STARTED',
                    payload: { nodeId: data.id, childGroups },
                });
                toggleDraggedNodeVisibility(node, data, false);
            }, 0);
        } else {
            event.preventDefault();
        }
    };

    node.addEventListener('dragstart', handleDragstart);
    const handleDragEnd = () => {
        data.viewStore.dispatch({ type: 'DOCUMENT/SET_DRAG_ENDED' });
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
