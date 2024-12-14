import {
    DocumentViewState,
    RecentNodes,
} from 'src/stores/view/view-state-type';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';

export type SetActiveRecentNodeAction = {
    type: 'view/recent-nodes/set-active-node';
    payload: {
        id: string;
    };
};

export const setActiveRecentNode = (
    documentState: DocumentViewState,
    state: RecentNodes,
    id: string,
) => {
    state.activeNode = id;
    const activeNodeIsBeingEdited = documentState.editing.activeNodeId === id;
    const editedNodeIsInSidebar = documentState.editing.isInSidebar;
    if (!(activeNodeIsBeingEdited && editedNodeIsInSidebar)) {
        disableEditMode(documentState);
    }
};
