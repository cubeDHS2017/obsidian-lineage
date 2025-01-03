import { Direction } from 'src/stores/document/document-store-actions';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';

import { isEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { LineageView } from 'src/view/view';

export const saveNodeAndInsertNode = (
    view: LineageView,
    direction: Direction,
    content = '',
    activeNodeId?: string,
) => {
    if (isEditing(view)) {
        saveNodeContent(view);
    }
    const nodeId =
        activeNodeId || view.viewStore.getValue().document.activeNode;
    view.documentStore.dispatch({
        type: 'DOCUMENT/INSERT_NODE',
        payload: {
            position: direction,
            content,
            activeNodeId: nodeId,
        },
    });
    if (content) {
        if (direction === 'down' || direction === 'right') {
            view.inlineEditor.setNodeCursor(nodeId, { line: 0, ch: 0 });
        }
    }
};
