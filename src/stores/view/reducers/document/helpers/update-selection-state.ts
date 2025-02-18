import { DocumentViewState } from 'src/stores/view/view-state-type';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import invariant from 'tiny-invariant';
import { updateSelectedNodes } from 'src/stores/view/reducers/document/helpers/update-selected-nodes';
import { resetSelectionState } from 'src/stores/view/reducers/document/helpers/reset-selection-state';
import { Column } from 'src/stores/document/document-state-type';

export const updateSelectionState = (
    columns: Column[],
    documentState: DocumentViewState,
    nextNode: string,
    isVertical: boolean,
    shiftKey: boolean,
) => {
    if (shiftKey && isVertical) {
        const columnIndex = findNodeColumn(columns, nextNode);
        const column = columns[columnIndex];
        invariant(column);
        updateSelectedNodes(
            column,
            documentState.selectedNodes,
            documentState.activeNode,
            nextNode,
        );
        documentState.selectedNodes = new Set(documentState.selectedNodes);
    } else {
        resetSelectionState(documentState);
    }
};
