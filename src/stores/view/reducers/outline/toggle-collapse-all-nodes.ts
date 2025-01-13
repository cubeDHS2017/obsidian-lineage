import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { collapseNode } from 'src/stores/view/reducers/outline/helpers/collapse-node';
import { expandNode } from 'src/stores/view/reducers/outline/helpers/expand-node';
import { traverseDown } from 'src/lib/tree-utils/get/traverse-down';

export const toggleCollapseAllNodes = (
    state: Pick<ViewState, 'outline'>,
    columns: Column[],
) => {
    const column = columns[0];
    if (!column) return;
    const rootNode = column.groups[0].parentId;
    const parents = traverseDown(columns, rootNode, true).filter(
        (id) => id !== rootNode,
    );
    const hasCollapsedNodes = state.outline.hiddenNodes.size > 0;
    state.outline.collapsedParents.clear();
    state.outline.hiddenNodes.clear();
    if (hasCollapsedNodes) {
        for (const id of parents) {
            expandNode(state, columns, id);
        }
    } else {
        for (const id of parents) {
            collapseNode(state, columns, id);
        }
    }

    state.outline = { ...state.outline };
};
