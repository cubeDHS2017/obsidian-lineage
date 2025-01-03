import { SetSearchQueryAction } from 'src/stores/view/reducers/search/set-search-query';
import { SetSearchResultsAction } from 'src/stores/view/reducers/search/set-search-results';
import { ToggleSearchInputAction } from 'src/stores/view/reducers/search/toggle-search-input';
import { SetDragStartedAction } from 'src/stores/view/reducers/document/on-drag-start';
import { SetDragCanceled } from 'src/stores/view/reducers/document/on-drag-end';
import { UpdateActiveBranchAction } from 'src/stores/view/reducers/document/helpers/update-active-branch';
import { JumpToNodeAction } from 'src/stores/view/reducers/document/jump-to-node';
import { ChangeActiveNodeAction } from 'src/stores/view/reducers/document/navigate-using-keyboard';
import { NodeHistoryNavigationAction } from 'src/stores/view/reducers/ui/navigate-active-node-history';
import { ToggleFuzzySearchAction } from 'src/stores/view/reducers/search/toggle-fuzzy-search';
import { NodeNavigationAction } from 'src/stores/view/reducers/ui/navigate-active-node';
import { SetActivePinnedNodeAction } from 'src/stores/view/reducers/pinned-cards/set-active-pinned-node';
import { SetActiveRecentNodeAction } from 'src/stores/view/reducers/recent-nodes/set-active-recent-node';
import { ToggleShowAllNodesAction } from 'src/stores/view/reducers/search/toggle-show-all-nodes';
import { StyleRulesResult } from 'src/stores/view/subscriptions/effects/style-rules/helpers/process-style-rules';

export type ViewStoreAction =
    | SearchAction
    | ViewUIAction
    | ViewDocumentAction
    | NodeSelectionAction
    | NodeHistoryNavigationAction
    | SidebarActions
    | StyleRulesViewActions
    | KeyboardEventAction;

export type SearchAction =
    | SetSearchQueryAction
    | SetSearchResultsAction
    | ToggleSearchInputAction
    | ToggleFuzzySearchAction
    | ToggleShowAllNodesAction;

export type ViewUIAction =
    | ToggleHelpSidebarAction
    | ToggleHistorySidebarAction
    | ToggleSettingsSidebarAction
    | { type: 'CLOSE_MODALS'; payload?: { closeAllModals: boolean } }
    | { type: 'view/modals/toggle-style-rules' };

export type ToggleEditModeAction = {
    type: 'view/main/enable-edit';
    payload: {
        nodeId: string;
    };
};

export type DisableEditModeAction = {
    type: 'view/main/disable-edit';
};

export type ViewDocumentAction =
    | DisableEditModeAction
    | ToggleEditModeAction
    | SetDragStartedAction
    | SetDragCanceled
    | UpdateActiveBranchAction
    | {
          type: 'view/confirmation/reset/disable-edit';
      }
    | {
          type: 'view/confirmation/reset/delete-node';
      }
    | {
          type: 'view/confirmation/confirm/delete-node';
          payload: {
              id: string;
              includeSelection?: boolean;
          };
      }
    | {
          type: 'view/confirmation/confirm/disable-edit';
          payload: {
              id: string;
          };
      }
    | { type: 'DOCUMENT/CLEAR_SELECTION' };
type ToggleHistorySidebarAction = {
    type: 'UI/TOGGLE_HISTORY_SIDEBAR';
};
type ToggleHelpSidebarAction = {
    type: 'UI/TOGGLE_HELP_SIDEBAR';
};
type ToggleSettingsSidebarAction = {
    type: 'UI/TOGGLE_SETTINGS_SIDEBAR';
};
type SetActiveNodeAction = {
    type: 'DOCUMENT/SET_ACTIVE_NODE';
    payload: {
        id: string;
    };
    context?: {
        modKey: boolean;
        source?: 'mouse';
    };
};
export type NodeSelectionAction =
    | JumpToNodeAction
    | ChangeActiveNodeAction
    | SetActiveNodeAction
    | NodeNavigationAction;

export type SidebarActions =
    | PinnedNodesActions
    | RecentNodesActions
    | EnableEditInSidebar
    | DisableEditInSidebar;

export type PinnedNodesActions = SetActivePinnedNodeAction;
export type RecentNodesActions = SetActiveRecentNodeAction;

export type EnableEditInSidebar = {
    type: 'view/sidebar/enable-edit';
    payload: {
        id: string;
    };
};

export type DisableEditInSidebar = {
    type: 'view/sidebar/disable-edit';
};

export type StyleRulesViewActions = UpdateStyleRulesResultAction;

export type UpdateStyleRulesResultAction = {
    type: 'view/style-rules/update-results';
    payload: {
        results: StyleRulesResult | null;
    };
};

export type KeyboardEventAction =
    | {
          type: 'view/keyboard/shift/down';
      }
    | {
          type: 'view/keyboard/shift/up';
      };
