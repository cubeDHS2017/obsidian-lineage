import { LineageView } from 'src/view/view';

export const deleteNode = (
    view: LineageView,
    nodeId: string,
    includeSelection = false,
) => {
    const documentStore = view.documentStore;
    const viewState = view.viewStore.getValue();
    if (viewState.document.pendingConfirmation.deleteNode.has(nodeId)) {
        const selectedNodes = includeSelection
            ? viewState.document.selectedNodes
            : undefined;
        documentStore.dispatch({
            type: 'DOCUMENT/DELETE_NODE',
            payload: {
                activeNodeId: nodeId,
                selectedNodes,
            },
        });
        view.viewStore.dispatch({
            type: 'view/confirmation/reset/delete-node',
        });
    } else {
        view.viewStore.dispatch({
            type: 'view/confirmation/confirm/delete-node',
            payload: {
                id: nodeId,
                includeSelection,
            },
        });
    }
};
