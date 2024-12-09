import { LineageView } from 'src/view/view';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import {
    getViewEventType,
    ViewEventType,
} from 'src/stores/view/helpers/get-view-event-type';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { maybeClearSelection } from 'src/stores/view/subscriptions/actions/maybe-clear-selection';
import { updateSearchResults } from 'src/stores/view/subscriptions/actions/update-search-results';
import { updateConflictingHotkeys } from 'src/stores/view/subscriptions/actions/update-conflicting-hotkeys';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { alignBranch } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { persistActiveNodeInPluginSettings } from 'src/stores/view/subscriptions/actions/persist-active-node-in-plugin-settings';
import { persistActivePinnedNode } from 'src/stores/view/subscriptions/actions/persist-active-pinned-node';
import { showSearchResultsInMinimap } from 'src/stores/view/subscriptions/effects/show-search-results-in-minimap';

export const onViewStateUpdate = (
    view: LineageView,
    action: ViewStoreAction,
    localState: { previousActiveNode: string },
) => {
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const viewStore = view.viewStore;
    const viewState = viewStore.getValue();
    const container = view.container;

    const type = action.type;

    const e: ViewEventType | null = getViewEventType(
        type as ViewStoreAction['type'],
    );

    const activeNodeChange = e.activeNode || e.activeNodeHistory;
    const activeNodeHasChanged =
        localState.previousActiveNode !== viewState.document.activeNode;
    if (activeNodeHasChanged) {
        localState.previousActiveNode = viewState.document.activeNode;
    }
    if (activeNodeChange && activeNodeHasChanged) {
        // this should be handled internally
        updateActiveBranch(viewStore, documentState);
        persistActiveNodeInPluginSettings(view);
        view.minimapStore.setActiveCardId(viewState.document.activeNode);
        view.plugin.statusBar.update({
            type: 'DOCUMENT_PROGRESS',
            payload: {
                view,
            },
        });
    }

    if (
        activeNodeChange &&
        activeNodeHasChanged &&
        type !== 'DOCUMENT/NAVIGATE_USING_KEYBOARD' &&
        type !== 'DOCUMENT/JUMP_TO_NODE'
    ) {
        maybeClearSelection(view, action);
    }

    if (action.type === 'SEARCH/SET_QUERY') {
        updateSearchResults(view);
    }
    if (action.type === 'UI/TOGGLE_HELP_SIDEBAR') {
        if (viewState.ui.controls.showHelpSidebar)
            updateConflictingHotkeys(view);
    }

    // effects
    if (activeNodeChange || e.search || e.edit) {
        const skipAligning =
            action.type === 'DOCUMENT/SET_ACTIVE_NODE' &&
            action.context?.modKey;
        if (!skipAligning) {
            alignBranch(view);
        }
    }
    if (!container || !view.isViewOfFile) return;
    const postInlineEditor = type === 'DOCUMENT/CONFIRM_DISABLE_EDIT';
    if (postInlineEditor) {
        const maybeViewIsClosing = !view.isActive;
        view.saveDocument(maybeViewIsClosing, postInlineEditor);
    }
    if (type === 'SEARCH/TOGGLE_FUZZY_MODE') {
        view.documentSearch.resetIndex();
    }

    if (
        action.type === 'DOCUMENT/DISABLE_EDIT_MODE' ||
        action.type === 'NAVIGATION/NAVIGATE_FORWARD' ||
        action.type === 'NAVIGATION/NAVIGATE_BACK'
    ) {
        focusContainer(view);
    }
    if (action.type === 'SEARCH/TOGGLE_INPUT') {
        if (!viewState.search.showInput) {
            focusContainer(view);
        }
    }

    if (
        action.type === 'SEARCH/SET_RESULTS' ||
        action.type === 'SEARCH/TOGGLE_INPUT' ||
        action.type === 'SEARCH/SET_QUERY'
    ) {
        showSearchResultsInMinimap(view);
    }

    if (type === 'view/pinned-nodes/set-active-node') {
        persistActivePinnedNode(view);
    }
};
