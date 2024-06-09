import { DocumentViewState } from 'src/stores/view/view-state-type';
import { ChangeActiveNodeAction } from 'src/stores/view/reducers/document/navigate-using-keyboard';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import invariant from 'tiny-invariant';
import { updateSelectedNodes } from 'src/stores/view/reducers/document/helpers/update-selected-nodes';
import { JumpToNodeAction } from 'src/stores/view/reducers/document/jump-to-node';
import { resetSelectionState } from 'src/stores/view/reducers/document/helpers/reset-selection-state';

export const updateSelectionState = (
    documentState: DocumentViewState,
    nextNode: string,
    action: ChangeActiveNodeAction | JumpToNodeAction,
) => {
    const isJump = action.type === 'DOCUMENT/JUMP_TO_NODE';
    const isVerticalStep =
        action.type === 'DOCUMENT/NAVIGATE_USING_KEYBOARD' &&
        (action.payload.direction === 'up' ||
            action.payload.direction === 'down');

    if (action.context?.shiftKey && (isJump || isVerticalStep)) {
        const columnIndex = findNodeColumn(action.payload.columns, nextNode);
        const column = action.payload.columns[columnIndex];
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
