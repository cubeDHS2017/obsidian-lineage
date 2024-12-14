import { LineageView } from 'src/view/view';
import { unloadInlineEditor } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';

export const saveNodeContent = (view: LineageView) => {
    if (view.inlineEditor.activeNode) {
        const content = view.inlineEditor.getContent();
        const nodeId = view.inlineEditor.activeNode;
        unloadInlineEditor(view);
        const isInSidebar =
            view.viewStore.getValue().document.editing.isInSidebar;
        if (isInSidebar) {
            view.viewStore.dispatch({
                type: 'view/sidebar/disable-edit',
            });
        } else {
            view.viewStore.dispatch({
                type: 'view/main/disable-edit',
            });
        }
        view.documentStore.dispatch({
            type: 'DOCUMENT/SET_NODE_CONTENT',
            payload: {
                nodeId: nodeId,
                content: content,
            },
            context: {
                isInSidebar,
            },
        });
    }
};
