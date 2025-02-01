import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { expandNode } from 'src/stores/view/reducers/outline/helpers/expand-node';

export const expandParentsOfActiveNode = (
    state: Pick<ViewState, 'outline' | 'document'>,
    columns: Column[],
) => {
    const parents = state.document.activeBranch.sortedParentNodes;
    let update = false;
    for (const parent of parents) {
        if (state.outline.collapsedParents.has(parent)) {
            expandNode(state, columns, parent);
            update = true;
        }
    }
    if (update) {
        state.outline = { ...state.outline };
    }
};
