import { ViewStore } from 'src/view/view';
import { DocumentState } from 'src/stores/document/document-state-type';
import { ChangeType } from 'src/stores/view/reducers/document/helpers/update-active-branch';

export const updateActiveBranch = (
    viewStore: ViewStore,
    documentState: DocumentState,
    changeType: ChangeType,
) => {
    viewStore.dispatch({
        type: 'UPDATE_ACTIVE_BRANCH',
        payload: {
            columns: documentState.document.columns,
        },
        context: {
            changeType,
        },
    });
};
