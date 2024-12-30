import {
    DocumentState,
    LineageDocument,
} from 'src/stores/document/document-state-type';
import invariant from 'tiny-invariant';

export const loadDocumentFromJSON = (
    state: DocumentState,
    document: LineageDocument,
) => {
    state.document.columns = document.columns;
    state.document.content = document.content;

    const activeNode = state.document.columns[0].groups[0].nodes[0];
    invariant(activeNode);

    return activeNode;
};
