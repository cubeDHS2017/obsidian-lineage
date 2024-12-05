import { LineageView } from 'src/view/view';
import { unloadInlineEditor } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';

export const saveNodeContent = (view: LineageView) => {
    if (view.inlineEditor.activeNode) {
        const content = view.inlineEditor.getContent();
        const nodeId = view.inlineEditor.activeNode;
        unloadInlineEditor(view);
        view.viewStore.dispatch({
            type: 'DOCUMENT/DISABLE_EDIT_MODE',
        });
        view.documentStore.dispatch({
            type: 'DOCUMENT/SET_NODE_CONTENT',
            payload: {
                nodeId: nodeId,
                content: content,
            },
        });
    }
};
