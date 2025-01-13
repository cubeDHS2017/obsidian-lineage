import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { collapseNode } from 'src/stores/view/reducers/outline/helpers/collapse-node';
import { expandNode } from 'src/stores/view/reducers/outline/helpers/expand-node';

export const toggleCollapseNode = (
    state: Pick<ViewState, 'outline'>,
    columns: Column[],
    id: string,
) => {
    const isCollapsed = state.outline.collapsedParents.has(id);
    if (isCollapsed) {
        expandNode(state, columns, id);
    } else {
        collapseNode(state, columns, id);
    }

    state.outline = { ...state.outline };
};
