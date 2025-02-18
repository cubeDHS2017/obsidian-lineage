import { LineageView } from 'src/view/view';
import { DocumentsStoreAction } from 'src/stores/documents/documents-store-actions';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { refreshScrollPosition } from 'src/view/components/container/minimap/event-handlers/on-canvas-wheel';

export const onDocumentsStateUpdate = (
    view: LineageView,
    action: DocumentsStoreAction,
) => {
    if (!view.container) return;
    if (action.type === 'WORKSPACE/ACTIVE_LEAF_CHANGE') {
        if (view.viewStore.getValue().document.editing.activeNodeId) {
            saveNodeContent(view);
        }
        if (view.minimapStore) refreshScrollPosition(view, 0);
    }
    if (
        action.type === 'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW' ||
        action.type === 'WORKSPACE/RESIZE'
    ) {
        if (view.isActive) {
            focusContainer(view);
            view.plugin.statusBar.updateAll(view);
        }
        view.alignBranch.align(action);
    }
};
