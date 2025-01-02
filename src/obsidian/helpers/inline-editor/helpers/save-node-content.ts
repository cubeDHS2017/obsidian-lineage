import { LineageView } from 'src/view/view';

export const saveNodeContent = (
    view: LineageView,
    nodeId: string,
    content: string,
) => {
    const viewState = view.viewStore.getValue();
    view.documentStore.dispatch({
        type: 'DOCUMENT/SET_NODE_CONTENT',
        payload: {
            nodeId: nodeId,
            content: content,
        },
        context: {
            isInSidebar: viewState.document.editing.isInSidebar,
        },
    });
};
