import { LineageView } from 'src/view/view';

export const pasteNode = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const text = (await navigator.clipboard.readText()).replace(/\r\n/g, '\n');
    if (text) {
        view.documentStore.dispatch({
            type: 'DOCUMENT/PASTE_NODE',
            payload: {
                targetNodeId: viewState.document.activeNode,
                text,
            },
        });
    }
};
