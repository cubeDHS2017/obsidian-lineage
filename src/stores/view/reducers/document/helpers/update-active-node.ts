import { DocumentViewState, ViewState } from 'src/stores/view/view-state-type';
import { addNavigationHistoryItem } from 'src/stores/view/reducers/ui/helpers/add-navigation-history-item';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';

export const updateActiveNode = (
    documentState: DocumentViewState,
    nodeId: string,
    state: null | Pick<ViewState, 'navigationHistory'>,
) => {
    documentState.activeNode = nodeId;
    if (state) addNavigationHistoryItem(state, documentState.activeNode);

    const activeNodeId = documentState.editing.activeNodeId;
    if (activeNodeId !== nodeId || documentState.editing.isInSidebar)
        disableEditMode(documentState);
};
