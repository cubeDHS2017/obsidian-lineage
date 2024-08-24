import { jsonToColumns } from 'src/lib/data-conversion/json-to-columns';
import { sectionsToJson } from 'src/lib/data-conversion/sections-to-json';
import { DocumentState } from 'src/stores/document/document-state-type';
import { SavedDocument } from 'src/stores/document/document-store-actions';
import { insertFirstNode } from 'src/lib/tree-utils/insert/insert-first-node';
import invariant from 'tiny-invariant';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { outlineToJson } from 'src/lib/data-conversion/outline-to-json';

export type LoadDocumentAction = {
    type: 'DOCUMENT/LOAD_FILE';
    payload: {
        document: SavedDocument;
        format: LineageDocumentFormat;
        activeSection: string | null;
    };
};

export const loadDocumentFromFile = (
    state: DocumentState,
    action: LoadDocumentAction,
) => {
    const tree =
        action.payload.format === 'outline'
            ? outlineToJson(action.payload.document.data)
            : sectionsToJson(action.payload.document.data);
    const document = jsonToColumns(tree);
    state.document.columns = document.columns;
    state.document.content = document.content;
    const emptyTree = tree.length === 0;
    if (emptyTree) {
        insertFirstNode(state.document.columns, state.document.content);
    }
    if (action.type === 'DOCUMENT/LOAD_FILE')
        state.file.frontmatter = action.payload.document.frontmatter;
    const activeNode = state.document.columns[0].groups[0].nodes[0];
    invariant(activeNode);

    return activeNode;
};
