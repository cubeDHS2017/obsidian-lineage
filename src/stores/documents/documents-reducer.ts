import { DocumentsStoreAction } from 'src/stores/documents/documents-store-actions';
import { DocumentsState } from 'src/stores/documents/documents-state-type';

const updateDocumentsState = (
    state: DocumentsState,
    action: DocumentsStoreAction,
) => {
    if (action.type === 'DOCUMENTS/DELETE_DOCUMENT') {
        const path = action.payload.path;
        if (path in state.documents) {
            const oldEntry = state.documents[path];
            oldEntry.documentStore.dispatch({
                type: 'RESET_STORE',
            });
            delete state.documents[path];
        }
    } else if (action.type === 'DOCUMENTS/UPDATE_DOCUMENT_PATH') {
        const oldPath = action.payload.oldPath;
        const newPath = action.payload.newPath;
        if (oldPath in state.documents) {
            const oldEntry = state.documents[oldPath];
            delete state.documents[oldPath];
            state.documents[newPath] = oldEntry;
            oldEntry.documentStore.dispatch({
                type: 'FS/SET_FILE_PATH',
                payload: {
                    path: newPath,
                },
            });
        }
    } else if (action.type === 'DOCUMENTS/ADD_DOCUMENT') {
        state.documents[action.payload.path] = {
            documentStore: action.payload.documentStore,
            viewId: action.payload.viewId,
        };
    } else if (action.type === 'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW') {
        if (state.documents[action.payload.path]) {
            state.documents[action.payload.path].viewId = action.payload.viewId;
        }
    }
};

export const documentsReducer = (
    store: DocumentsState,
    action: DocumentsStoreAction,
): DocumentsState => {
    updateDocumentsState(store, action);
    return store;
};
