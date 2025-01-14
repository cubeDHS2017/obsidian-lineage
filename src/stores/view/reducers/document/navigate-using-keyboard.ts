import { Column } from 'src/stores/document/document-state-type';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { findNextActiveNodeOnKeyboardNavigation } from 'src/lib/tree-utils/find/find-next-active-node-on-keyboard-navigation';
import { DocumentViewState, ViewState } from 'src/stores/view/view-state-type';
import { updateSelectionState } from 'src/stores/view/reducers/document/helpers/update-selection-state';

export type ChangeActiveNodeAction = {
    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD';
    payload: {
        direction: AllDirections;
        columns: Column[];
    };
    context: {
        shiftKey?: boolean;
        outlineMode: boolean;
    };
};

export const navigateUsingKeyboard = (
    documentState: DocumentViewState,
    state: Pick<ViewState, 'navigationHistory' | 'outline'>,
    action: ChangeActiveNodeAction,
) => {
    const nextNode = findNextActiveNodeOnKeyboardNavigation(
        action.payload.columns,
        documentState.activeNode,
        action.payload.direction,
        documentState.activeNodesOfColumn,
        action.context.outlineMode ? state.outline.collapsedParents : null,
    );
    if (nextNode) {
        updateSelectionState(documentState, nextNode, action);
        updateActiveNode(documentState, nextNode, state);
    }
};
