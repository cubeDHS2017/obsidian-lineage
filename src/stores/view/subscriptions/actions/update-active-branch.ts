import { ViewStore } from 'src/view/view';
import { DocumentState } from 'src/stores/document/document-state-type';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';

export const updateActiveBranch = (
    viewStore: ViewStore,
    documentState: DocumentState,
    documentAction?: DocumentStoreAction,
) => {
    if (documentAction) {
        viewStore.dispatch({
            type: 'view/update-active-branch?source=document',
            context: {
                columns: documentState.document.columns,
                documentAction,
            },
        });
    } else {
        viewStore.dispatch({
            type: 'view/update-active-branch?source=view',
            context: {
                columns: documentState.document.columns,
            },
        });
    }
};
