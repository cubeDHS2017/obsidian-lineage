import { Column } from 'src/stores/document/document-state-type';
import { traverseUp } from 'src/lib/tree-utils/get/traverse-up';
import { traverseDown } from 'src/lib/tree-utils/get/traverse-down';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import { DocumentViewState } from 'src/stores/view/view-state-type';
import { removeStaleActiveNodes } from 'src/stores/view/reducers/document/helpers/remove-stale-active-nodes';
import { compareActiveBranch } from 'src/stores/view/reducers/document/helpers/compare-active-branch';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';

export type UpdateActiveBranchAction =
    | {
          type: 'view/update-active-branch?source=view';
          context: {
              columns: Column[];
          };
      }
    | {
          type: 'view/update-active-branch?source=document';
          context: {
              columns: Column[];
              documentAction: DocumentStoreAction;
          };
      };

export type ActiveBranch = {
    childGroups: Set<string>;
    sortedParentNodes: string[];
    group: string;
    column: string;
    node: string;
};

export const updateActiveBranch = (
    state: Pick<
        DocumentViewState,
        'activeBranch' | 'activeNode' | 'activeNodesOfColumn'
    >,
    columns: Column[],
    isDocumentAction: boolean,
) => {
    if (!state.activeNode) return;
    const sortedParents = traverseUp(columns, state.activeNode).reverse();
    const childGroups = traverseDown(columns, state.activeNode, true);
    const group = findGroupByNodeId(columns, state.activeNode);
    if (!group)
        throw new Error('could not find group for node ' + state.activeNode);
    const columnId = columns[findNodeColumn(columns, state.activeNode)].id;

    const newActiveBranch = {
        childGroups: new Set<string>(childGroups),
        sortedParentNodes: sortedParents,
        group: group.parentId,
        column: columnId,
        node: state.activeNode,
    };
    const same = compareActiveBranch(state.activeBranch, newActiveBranch);
    if (!same) {
        state.activeBranch = newActiveBranch;
    }
    if (!state.activeNodesOfColumn[columnId])
        state.activeNodesOfColumn[columnId] = {};
    state.activeNodesOfColumn[columnId][group.parentId] = state.activeNode;

    if (isDocumentAction) {
        state.activeNodesOfColumn = removeStaleActiveNodes(
            columns,
            state.activeNodesOfColumn,
        );
    }
};
