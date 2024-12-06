import {
    DocumentViewState,
    PinnedNodes,
} from 'src/stores/view/view-state-type';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';

export type SetActivePinnedNodeAction = {
    type: 'view/pinned-nodes/set-active-node';
    payload: {
        id: string;
    };
};

export const setActivePinnedNode = (
    documentState: DocumentViewState,
    state: PinnedNodes,
    id: string,
) => {
    state.activeNode = id;
    const activePinnedNodeIsBeingEdited =
        documentState.editing.activeNodeId === id;
    const editedNodeIsInSidebar = documentState.editing.isInSidebar;
    if (!(activePinnedNodeIsBeingEdited && editedNodeIsInSidebar)) {
        disableEditMode(documentState);
    }
};
