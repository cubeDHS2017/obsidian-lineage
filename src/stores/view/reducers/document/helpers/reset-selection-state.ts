import { DocumentViewState } from 'src/stores/view/view-state-type';

export const resetSelectionState = (documentState: DocumentViewState) => {
    documentState.selectedNodes = new Set();
};
