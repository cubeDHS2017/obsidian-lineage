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
import { LeftSidebarTab } from 'src/stores/settings/settings-type';
import { ConflictingHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';
import { Column } from 'src/stores/document/document-state-type';

export type ViewStoreAction =
    | SearchAction
    | ViewUIAction
    | ViewDocumentAction
    | NodeSelectionAction
    | NodeHistoryNavigationAction
    | SidebarActions
    | StyleRulesViewActions
    | KeyboardEventAction
    | ViewHotkeysAction
    | OutlineAction
    | SelectionActions
    | PersistedStateActions;

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
    context?: {
        modKey?: boolean;
    };
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
    type: `view/set-active-node/${'mouse' | 'mouse-silent' | 'search' | 'document'}`;
    payload: {
        id: string;
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
    context: {
        activeSidebarTab: LeftSidebarTab;
    };
};

export type DisableEditInSidebar = {
    type: 'view/sidebar/disable-edit';
    context?: {
        modKey?: boolean;
    };
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

export type ViewHotkeysAction =
    | SetSearchTermAction
    | UpdateConflictingHotkeysAction;
export type SetSearchTermAction = {
    type: 'view/hotkeys/set-search-term';
    payload: {
        searchTerm: string;
    };
};
export type UpdateConflictingHotkeysAction = {
    type: 'view/hotkeys/update-conflicts';
    payload: {
        conflicts: ConflictingHotkeys;
    };
};

export type OutlineAction =
    | {
          type: 'view/outline/toggle-collapse-node';
          payload: { id: string; columns: Column[] };
      }
    | {
          type: 'view/outline/refresh-collapsed-nodes';
          payload: { columns: Column[] };
      }
    | {
          type: 'view/outline/toggle-collapse-all';
          payload: { columns: Column[] };
      };

export type SelectionActions = {
    type: 'view/selection/set-selection';
    payload: { ids: string[] };
};

export type PersistedStateActions = {
    type: 'view/persisted-state/load-persisted-collapsed-parents';
    payload: {
        collapsedIds: string[];
    };
    context: {
        columns: Column[];
    };
};
