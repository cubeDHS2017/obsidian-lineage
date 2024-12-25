import { ViewState } from 'src/stores/view/view-state-type';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import { setSearchQuery } from 'src/stores/view/reducers/search/set-search-query';
import { setSearchResults } from 'src/stores/view/reducers/search/set-search-results';
import { toggleSearchInput } from 'src/stores/view/reducers/search/toggle-search-input';
import { enableEditMode } from 'src/stores/view/reducers/document/enable-edit-mode';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';
import { onDragStart } from 'src/stores/view/reducers/document/on-drag-start';
import { onDragEnd } from 'src/stores/view/reducers/document/on-drag-end';
import { updateActiveBranch } from 'src/stores/view/reducers/document/helpers/update-active-branch';
import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { navigateUsingKeyboard } from 'src/stores/view/reducers/document/navigate-using-keyboard';
import { navigateActiveNodeHistory } from 'src/stores/view/reducers/ui/navigate-active-node-history';
import { jumpToNode } from 'src/stores/view/reducers/document/jump-to-node';

import { removeDeletedNavigationItems } from 'src/stores/view/reducers/ui/helpers/remove-deleted-navigation-items';
import { toggleFuzzySearch } from 'src/stores/view/reducers/search/toggle-fuzzy-search';
import { resetSelectionState } from 'src/stores/view/reducers/document/helpers/reset-selection-state';
import { navigateActiveNode } from 'src/stores/view/reducers/ui/navigate-active-node';
import { setActivePinnedNode } from 'src/stores/view/reducers/pinned-cards/set-active-pinned-node';
import { setActiveRecentNode } from 'src/stores/view/reducers/recent-nodes/set-active-recent-node';
import { toggleShowAllNodes } from 'src/stores/view/reducers/search/toggle-show-all-nodes';

const updateDocumentState = (state: ViewState, action: ViewStoreAction) => {
    if (action.type === 'DOCUMENT/SET_ACTIVE_NODE') {
        updateActiveNode(state.document, action.payload.id, state);
    } else if (action.type === 'DOCUMENT/NAVIGATE_USING_KEYBOARD') {
        navigateUsingKeyboard(state.document, state, action);
    } else if (action.type === 'SEARCH/SET_QUERY') {
        setSearchQuery(state, action.payload.query);
    } else if (action.type === 'SEARCH/SET_RESULTS') {
        setSearchResults(state, action.payload.results);
    } else if (action.type === 'SEARCH/TOGGLE_INPUT') {
        toggleSearchInput(state);
    } else if (action.type === 'UI/TOGGLE_HISTORY_SIDEBAR') {
        const showHistorySidebar = state.ui.controls.showHistorySidebar;
        state.ui.controls = {
            showHistorySidebar: !showHistorySidebar,
            showHelpSidebar: false,
            showSettingsSidebar: false,
        };
    } else if (action.type === 'UI/TOGGLE_HELP_SIDEBAR') {
        const showHelpSidebar = state.ui.controls.showHelpSidebar;
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: !showHelpSidebar,
            showSettingsSidebar: false,
        };
    } else if (action.type === 'UI/TOGGLE_SETTINGS_SIDEBAR') {
        const showSettingsSidebar = state.ui.controls.showSettingsSidebar;
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: false,
            showSettingsSidebar: !showSettingsSidebar,
        };
    } else if (action.type === 'CLOSE_MODALS') {
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: action.payload?.closeAllModals
                ? false
                : state.ui.controls.showHelpSidebar,
            showSettingsSidebar: false,
        };
    } else if (action.type === 'view/main/enable-edit') {
        if (state.document.activeNode !== action.payload.nodeId) {
            updateActiveNode(state.document, action.payload.nodeId, state);
        }
        enableEditMode(state.document, action.payload.nodeId);
    } else if (action.type === 'view/sidebar/enable-edit') {
        enableEditMode(state.document, action.payload.id, true);
    } else if (action.type === 'DOCUMENT/CONFIRM_DISABLE_EDIT') {
        state.document.editing = {
            ...state.document.editing,
            disableEditConfirmation: true,
        };
    } else if (action.type === 'DOCUMENT/RESET_DISABLE_EDIT_CONFIRMATION') {
        state.document.editing = {
            ...state.document.editing,
            disableEditConfirmation: false,
        };
    } else if (
        action.type === 'view/main/disable-edit' ||
        action.type === 'view/sidebar/disable-edit'
    ) {
        disableEditMode(state.document);
    } else if (action.type === 'SET_DRAG_STARTED') {
        onDragStart(state.document, action);
    } else if (action.type === 'DOCUMENT/SET_DRAG_ENDED') {
        onDragEnd(state.document);
    } else if (action.type === 'UPDATE_ACTIVE_BRANCH') {
        updateActiveBranch(
            state.document,
            action.payload.columns,
            state.document.activeNodesOfColumn,
        );
    } else if (action.type === 'NAVIGATION/NAVIGATE_FORWARD') {
        navigateActiveNodeHistory(state.document, state, true);
    } else if (action.type === 'NAVIGATION/NAVIGATE_BACK') {
        navigateActiveNodeHistory(state.document, state);
    } else if (action.type === 'DOCUMENT/JUMP_TO_NODE') {
        jumpToNode(state.document, state, action);
    } else if (action.type === 'NAVIGATION/REMOVE_OBSOLETE') {
        removeDeletedNavigationItems(state, action.payload.content);
    } else if (action.type === 'SEARCH/TOGGLE_FUZZY_MODE') {
        toggleFuzzySearch(state);
    } else if (action.type === 'DOCUMENT/CLEAR_SELECTION') {
        resetSelectionState(state.document);
    } else if (action.type === 'NAVIGATION/SELECT_NEXT_NODE') {
        navigateActiveNode(state.document, state, action);
    } else if (action.type === 'view/pinned-nodes/set-active-node') {
        setActivePinnedNode(
            state.document,
            state.pinnedNodes,
            action.payload.id,
        );
    } else if (action.type === 'view/recent-nodes/set-active-node') {
        setActiveRecentNode(
            state.document,
            state.recentNodes,
            action.payload.id,
        );
    } else if (action.type === 'search/toggle-show-all-nodes') {
        toggleShowAllNodes(state);
    }
};
export const viewReducer = (
    store: ViewState,
    action: ViewStoreAction,
): ViewState => {
    updateDocumentState(store, action);
    return store;
};
