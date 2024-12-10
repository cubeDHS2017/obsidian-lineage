import { DocumentViewState } from 'src/stores/view/view-state-type';
import { SilentError } from 'src/lib/errors/errors';

export const enableEditMode = (
    state: Pick<DocumentViewState, 'editing'>,
    nodeId: string,
    isInSidebar = false,
) => {
    if (state.editing.activeNodeId) {
        const isSameNode = state.editing.activeNodeId === nodeId;
        const isSameNodeInDifferentSplit =
            isSameNode && state.editing.isInSidebar !== isInSidebar;
        if (!isSameNode) {
            throw new Error('Another card is being edited');
        } else if (isSameNodeInDifferentSplit) {
            throw new SilentError(
                `This card is being edited in the ${state.editing.isInSidebar ? 'sidebar' : 'main view'}`,
            );
        } else {
            throw new SilentError(
                `another node [${state.editing.activeNodeId}] is already in edit mode`,
            );
        }
    }
    state.editing = {
        activeNodeId: nodeId,
        disableEditConfirmation: false,
        isInSidebar: isInSidebar,
    };
};
