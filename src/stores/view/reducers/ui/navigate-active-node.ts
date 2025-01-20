import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { DocumentViewState, ViewState } from 'src/stores/view/view-state-type';
import { Sections } from 'src/stores/document/document-state-type';
import { findNextNode } from 'src/lib/tree-utils/find/find-next-node';

export type NodeNavigationAction = {
    type: 'NAVIGATION/SELECT_NEXT_NODE';
    payload: {
        sections: Sections;
        direction: 'back' | 'forward';
    };
    context: {
        outlineMode: boolean;
    };
};

export const navigateActiveNode = (
    documentState: DocumentViewState,
    state: Pick<ViewState, 'navigationHistory' | 'outline'>,
    action: NodeNavigationAction,
) => {
    const nextNode = findNextNode(
        action.payload.sections,
        documentState.activeNode,
        action.payload.direction,
        action.context.outlineMode ? state.outline.hiddenNodes : null,
    );
    if (nextNode && nextNode !== documentState.activeNode)
        updateActiveNode(documentState, nextNode, state);
};
