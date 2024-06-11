import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { updateNavigationState } from 'src/stores/document/reducers/history/helpers/update-navigation-state';
import { DocumentViewState, ViewState } from 'src/stores/view/view-state-type';

import { RemoveObsoleteNavigationItemsAction } from 'src/stores/view/reducers/ui/helpers/remove-deleted-navigation-items';

export type NodeHistoryNavigationAction =
    | {
          type: 'NAVIGATION/NAVIGATE_BACK' | 'NAVIGATION/NAVIGATE_FORWARD';
      }
    | RemoveObsoleteNavigationItemsAction;

export const navigateActiveNodeHistory = (
    documentState: DocumentViewState,
    state: Pick<ViewState, 'navigationHistory'>,
    forward = false,
) => {
    const activeIndex = state.navigationHistory.state.activeIndex;
    const newIndex = forward ? activeIndex + 1 : activeIndex - 1;
    const newItem = state.navigationHistory.items[newIndex];
    if (newItem) {
        state.navigationHistory.state.activeIndex = newIndex;
        updateNavigationState(state.navigationHistory);
        state.navigationHistory = { ...state.navigationHistory };
        updateActiveNode(documentState, newItem, null);
    }
};
