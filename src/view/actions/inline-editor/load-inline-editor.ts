import { LineageView } from 'src/view/view';

export const loadInlineEditor = (
    target: HTMLElement,
    { nodeId, view }: { view: LineageView; nodeId: string },
) => {
    if (!view.file) return;
    view.inlineEditor.loadNode(target, nodeId);
    return {
        destroy: () => {
            if (view.inlineEditor.activeNode === nodeId) {
                const viewState = view.viewStore.getValue();
                view.documentStore.dispatch({
                    type: 'DOCUMENT/SET_NODE_CONTENT',
                    payload: {
                        nodeId,
                        content: view.inlineEditor.getContent(),
                    },
                    context: {
                        isInSidebar: viewState.document.editing.isInSidebar,
                    },
                });
                view.inlineEditor.unloadNode();
            }
        },
    };
};
