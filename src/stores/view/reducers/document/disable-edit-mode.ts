import { DocumentViewState } from 'src/stores/view/view-state-type';

export type DisableEditModeAction = {
    type: 'DOCUMENT/DISABLE_EDIT_MODE';
};
export const disableEditMode = (state: Pick<DocumentViewState, 'editing'>) => {
    state.editing = {
        activeNodeId: '',
        disableEditConfirmation: false,
        isInSidebar: false,
    };
};
