import { Column } from 'src/stores/document/document-state-type';
import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { findNextActiveNode } from 'src/lib/tree-utils/find/find-next-active-node';
import { DocumentViewState, ViewState } from 'src/stores/view/view-state-type';
import { updateSelectionState } from 'src/stores/view/reducers/document/helpers/update-selection-state';

export type JumpTarget =
    | 'start-of-group'
    | 'end-of-group'
    | 'start-of-column'
    | 'end-of-column';
export type JumpToNodeAction = {
    type: 'DOCUMENT/JUMP_TO_NODE';
    payload: {
        target: JumpTarget;
        columns: Column[];
    };
    context?: {
        shiftKey: boolean;
    };
};

export const jumpToNode = (
    documentViewState: DocumentViewState,
    state: Pick<ViewState, 'navigationHistory'>,
    action: JumpToNodeAction,
) => {
    const nextNode = findNextActiveNode(
        action.payload.columns,
        documentViewState.activeNode,
        action,
    );
    if (nextNode) {
        updateSelectionState(documentViewState, nextNode, action);
        updateActiveNode(documentViewState, nextNode, state);
    }
};
