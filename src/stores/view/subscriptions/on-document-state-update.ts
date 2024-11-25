import { LineageView } from 'src/view/view';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    DocumentEventType,
    getDocumentEventType,
} from 'src/stores/view/helpers/get-document-event-type';
import { discardChanges } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';
import { setActiveNode } from 'src/stores/view/subscriptions/actions/set-active-node';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { clearSelectedNodes } from 'src/stores/view/subscriptions/actions/clear-selected-nodes';
import { enableEditMode } from 'src/stores/view/subscriptions/actions/enable-edit-mode';
import { removeObsoleteNavigationItems } from 'src/stores/view/subscriptions/actions/remove-obsolete-navigation-items';
import { resetSearchFuse } from 'src/stores/view/subscriptions/actions/update-search-results/helpers/reset-search-fuse';
import { updateStatusBar } from 'src/stores/view/subscriptions/effects/update-status-bar';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { alignBranch } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

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
        discardChanges(view);
    }

    const structuralChange =
        e.createOrDelete || e.dropOrMove || e.changeHistory || e.clipboard;
    if (structuralChange) {
        setActiveNode(viewStore, documentState);
        updateActiveBranch(viewStore, documentState);
        view.minimapStore.setActiveCardId(
            viewStore.getValue().document.activeNode,
        );
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
    if (!container || !view.isViewOfFile) return;

    if (e.content || structuralChange) {
        const maybeViewIsClosing = !view.isActive;
        view.saveDocument(maybeViewIsClosing);
    }

    if (e.content || structuralChange) {
        resetSearchFuse(documentStore);
        view.minimapStore.setDocument(documentState.document);
    }
    if (structuralChange) {
        updateStatusBar(view);
    }

    if (e.content || structuralChange) {
        focusContainer(view);
    }

    if (structuralChange || e.content) {
        let scrollingBehavior: ScrollBehavior | undefined;
        let delay: number | undefined;
        if (action.type === 'DOCUMENT/MOVE_NODE') {
            const verticalMove =
                action.payload.direction === 'down' ||
                action.payload.direction === 'up';
            if (verticalMove) scrollingBehavior = 'instant';
        } else if (action.type === 'DOCUMENT/LOAD_FILE') {
            scrollingBehavior = 'instant';
        } else if (action.type === 'DOCUMENT/DROP_NODE') {
            delay = 500;
        }
        alignBranch(
            view,
            scrollingBehavior,
            type === 'DOCUMENT/SPLIT_NODE' ? true : undefined,
            delay,
        );
    }
};
