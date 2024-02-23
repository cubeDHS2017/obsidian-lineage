import { DocumentState } from 'src/view/store/document-reducer';

export const updateEditingNodeOnActiveNodeChange = (
    state: DocumentState,
    nodeId: string,
    newNode = false,
) => {
    state.state.activeBranch.node = nodeId;
    state.state.editing.savePreviousNode = true;
    if (newNode) {
        state.state.editing.activeNodeId = nodeId;
    } else if (state.state.editing.activeNodeId !== nodeId) {
        state.state.editing.activeNodeId = '';
    }
};
