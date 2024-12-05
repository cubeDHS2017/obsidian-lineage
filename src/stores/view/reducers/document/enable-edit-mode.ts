import { DocumentViewState } from 'src/stores/view/view-state-type';
import { SilentError } from 'src/lib/errors/errors';

export type ToggleEditModeAction = {
    type: 'DOCUMENT/ENABLE_EDIT_MODE';
    payload: {
        nodeId: string;
        isInSidebar?: boolean;
    };
};
export const enableEditMode = (
    state: Pick<DocumentViewState, 'editing'>,
    action: ToggleEditModeAction,
) => {
    if (state.editing.activeNodeId) {
        const isSameNode = state.editing.activeNodeId === action.payload.nodeId;
        const isSameNodeInDifferentSplit =
            isSameNode &&
            state.editing.isInSidebar !== action.payload.isInSidebar;
        if (!isSameNode) {
            throw new Error('Another card is being edited');
        } else if (isSameNodeInDifferentSplit) {
            throw new Error(
                `This card is being edited in the ${state.editing.isInSidebar ? 'sidebar' : 'main view'}`,
            );
        } else {
            throw new SilentError(
                `another node [${state.editing.activeNodeId}] is already in edit mode`,
            );
        }
    }
    state.editing = {
        activeNodeId: action.payload.nodeId,
        disableEditConfirmation: false,
        isInSidebar: Boolean(action.payload.isInSidebar),
    };
};
