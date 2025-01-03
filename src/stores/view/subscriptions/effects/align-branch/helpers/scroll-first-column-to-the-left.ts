import { DocumentState } from 'src/stores/document/document-state-type';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignElementHorizontally } from 'src/lib/align-element/align-element-horizontally';

export const scrollFirstColumnToTheLeft = (
    documentState: DocumentState,
    container: HTMLElement,
) => {
    const firstColumnId = documentState.document.columns[0]?.id;
    if (!firstColumnId) return;
    const firstColumnElement = getNodeElement(container, firstColumnId);
    if (!firstColumnElement) return;
    if (firstColumnId) {
        alignElementHorizontally(
            container,
            firstColumnElement,
            false,
            'instant',
            true,
        );
    }
};
