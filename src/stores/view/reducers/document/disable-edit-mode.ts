import { DocumentViewState } from 'src/stores/view/view-state-type';
import { resetPendingConfirmation } from 'src/stores/view/reducers/document/reset-pending-confirmation';

export const disableEditMode = (
    state: Pick<DocumentViewState, 'editing' | 'pendingConfirmation'>,
) => {
    state.editing = {
        activeNodeId: '',
        isInSidebar: false,
    };
    resetPendingConfirmation(state);
};
