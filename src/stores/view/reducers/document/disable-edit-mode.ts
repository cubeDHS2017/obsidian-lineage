import { DocumentViewState } from 'src/stores/view/view-state-type';

export const disableEditMode = (state: Pick<DocumentViewState, 'editing'>) => {
    state.editing = {
        activeNodeId: '',
        disableEditConfirmation: false,
        isInSidebar: false,
    };
};
