import { LineageView } from 'src/view/view';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import {
    getViewEventType,
    ViewEventType,
} from 'src/stores/view/helpers/get-view-event-type';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { maybeClearSelection } from 'src/stores/view/subscriptions/actions/maybe-clear-selection';
import { updateSearchResults } from 'src/stores/view/subscriptions/actions/update-search-results';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { persistActiveNodeInPluginSettings } from 'src/stores/view/subscriptions/actions/persist-active-node-in-plugin-settings';
import { persistActivePinnedNode } from 'src/stores/view/subscriptions/actions/persist-active-pinned-node';
import { showSearchResultsInMinimap } from 'src/stores/view/subscriptions/effects/show-search-results-in-minimap';
import { getUsedHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';
import { persistCollapsedSections } from 'src/stores/view/subscriptions/actions/settings/persist-collapsed-sections';

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
        viewStore.dispatch({
            type: 'view/update-active-branch?source=view',
            context: {
                columns: documentState.document.columns,
                viewAction: action,
            },
        });
        persistActiveNodeInPluginSettings(view);
        view.plugin.statusBar.updateProgressIndicatorAndChildCount(view);
    }
    if (activeNodeChange) {
        if (view.minimapStore) {
            view.minimapStore.dispatch({
                type: 'minimap/set-active-node',
                payload: {
                    id: viewState.document.activeNode,
                },
            });
        }
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

    // effects
    if (
        e.search ||
        e.editMainSplit ||
        action.type === 'view/update-active-branch?source=document' ||
        action.type === 'view/update-active-branch?source=view'
    ) {
        view.alignBranch.align(action);
    }
    if (!container || !view.isViewOfFile) return;

    if (type === 'SEARCH/TOGGLE_FUZZY_MODE') {
        view.documentSearch.resetIndex();
    }

    if (
        action.type === 'view/main/disable-edit' ||
        action.type === 'view/sidebar/disable-edit' ||
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

    if (action.type === 'UI/TOGGLE_HELP_SIDEBAR') {
        if (viewState.ui.controls.showHelpSidebar) {
            view.viewStore.dispatch({
                type: 'view/hotkeys/update-conflicts',
                payload: {
                    conflicts: getUsedHotkeys(view.plugin),
                },
            });
        }
    }

    if (
        action.type === 'view/outline/toggle-collapse-all' ||
        action.type === 'view/outline/toggle-collapse-node' ||
        action.type === 'view/outline/refresh-collapsed-nodes'
    ) {
        persistCollapsedSections(view);
    }
};
