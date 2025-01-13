import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { expandNode } from 'src/stores/view/reducers/outline/helpers/expand-node';
import { collapseNode } from 'src/stores/view/reducers/outline/helpers/collapse-node';

export const refreshCollapsedNodes = (
    state: Pick<ViewState, 'outline'>,
    columns: Column[],
) => {
    const collapsedParents = Array.from(state.outline.collapsedParents);
    state.outline.collapsedParents.clear();
    state.outline.hiddenNodes.clear();
    for (const id of collapsedParents) {
        expandNode(state, columns, id);
        collapseNode(state, columns, id);
    }

    state.outline = { ...state.outline };
};
