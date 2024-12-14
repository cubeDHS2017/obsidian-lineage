import { LineageView } from 'src/view/view';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    DocumentEventType,
    getDocumentEventType,
} from 'src/stores/view/helpers/get-document-event-type';
import { unloadInlineEditor } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';
import { setActiveNode } from 'src/stores/view/subscriptions/actions/set-active-node';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { clearSelectedNodes } from 'src/stores/view/subscriptions/actions/clear-selected-nodes';
import { enableEditMode } from 'src/stores/view/subscriptions/actions/enable-edit-mode';
import { removeObsoleteNavigationItems } from 'src/stores/view/subscriptions/actions/remove-obsolete-navigation-items';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { alignBranchAfterDocumentSave } from 'src/stores/view/subscriptions/effects/align-branch/wrappers/align-branch-after-document-save';
import { persistPinnedNodes } from 'src/stores/view/subscriptions/actions/persist-pinned-nodes';
import { updateStaleActivePinnedNode } from 'src/stores/view/subscriptions/actions/update-stale-active-pinned-node';
import { setActivePinnedNode } from 'src/stores/view/subscriptions/actions/set-active-pinned-node';

export const onDocumentStateUpdate = (
    view: LineageView,
    action: DocumentStoreAction,
) => {
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const viewStore = view.viewStore;
    const container = view.container;

    const type = action.type;

    const e: DocumentEventType | null = getDocumentEventType(
        type as DocumentStoreAction['type'],
    );
    if (type === 'DOCUMENT/LOAD_FILE') {
        // needed when the file was modified externally
        // to prevent saving a node with an obsolete node-id
        unloadInlineEditor(view);
    }

    const structuralChange =
        e.createOrDelete || e.dropOrMove || e.changeHistory || e.clipboard;
    if (structuralChange) {
        setActiveNode(view, action);
        updateActiveBranch(viewStore, documentState);
        view.minimapStore.setActiveCardId(
            viewStore.getValue().document.activeNode,
        );
        documentStore.dispatch({
            type: 'document/pinned-nodes/remove-stale-nodes',
        });
        documentStore.dispatch({ type: 'META/REFRESH_GROUP_PARENT_IDS' });
    }

    if (structuralChange && type !== 'DOCUMENT/MOVE_NODE') {
        clearSelectedNodes(view);
    }

    if (type === 'DOCUMENT/INSERT_NODE' && view.isActive) {
        enableEditMode(viewStore, documentState);
    }

    if (
        type === 'DOCUMENT/DELETE_NODE' ||
        type === 'DOCUMENT/CUT_NODE' ||
        e.changeHistory ||
        type === 'DOCUMENT/EXTRACT_BRANCH' ||
        type === 'DOCUMENT/LOAD_FILE' ||
        type === 'DOCUMENT/SPLIT_NODE'
    ) {
        removeObsoleteNavigationItems(viewStore, documentState);
    }

    // effects
    if (structuralChange || e.content) {
        alignBranchAfterDocumentSave(view, action);
    }

    if (!container || !view.isViewOfFile) return;

    if (e.content || structuralChange) {
        const maybeViewIsClosing = !view.isActive;
        view.saveDocument(maybeViewIsClosing);
    }

    if (e.content || structuralChange) {
        view.documentSearch.resetIndex();
        view.minimapStore.setDocument(documentState.document);
    }
    if (structuralChange) {
        view.plugin.statusBar.updateAll(view);
    }

    if (e.content || structuralChange) {
        if (view.isActive) focusContainer(view);
    }

    const pinnedNodesUpdate =
        type === 'document/pinned-nodes/remove-stale-nodes' ||
        type === 'document/pinned-nodes/pin' ||
        type === 'document/pinned-nodes/unpin';

    if (pinnedNodesUpdate) {
        persistPinnedNodes(view);
    }
    if (
        pinnedNodesUpdate ||
        type === 'document/pinned-nodes/load-from-settings'
    ) {
        if (type === 'document/pinned-nodes/pin') {
            setActivePinnedNode(view, action.payload.id);
        } else {
            updateStaleActivePinnedNode(view);
        }
    }
};
