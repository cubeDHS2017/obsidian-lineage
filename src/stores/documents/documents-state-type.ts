import { DocumentStore } from 'src/view/view';

export type DocumentsState = {
    documents: {
        [path: string]: {
            documentStore: DocumentStore;
            viewId: string;
        };
    };
};
