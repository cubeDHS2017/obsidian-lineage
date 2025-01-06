import { Column } from 'src/stores/document/document-state-type';
import { traverseUp } from 'src/lib/tree-utils/get/traverse-up';
import { traverseDown } from 'src/lib/tree-utils/get/traverse-down';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import {
    ActiveNodesOfColumn,
    DocumentViewState,
} from 'src/stores/view/view-state-type';

export type UpdateActiveBranchAction = {
    type: 'UPDATE_ACTIVE_BRANCH';
    payload: {
        columns: Column[];
    };
};

export const updateActiveBranch = (
    state: Pick<DocumentViewState, 'activeBranch' | 'activeNode'>,
    columns: Column[],
    activeNodeOfGroup: ActiveNodesOfColumn,
) => {
    if (!state.activeNode) return;
    const sortedParents = traverseUp(columns, state.activeNode).reverse();
    const childGroups = traverseDown(columns, state.activeNode, true);
    const group = findGroupByNodeId(columns, state.activeNode);
    if (!group)
        throw new Error('could not find group for node ' + state.activeNode);
    const columnId = columns[findNodeColumn(columns, state.activeNode)].id;

    const needsUpdate =
        childGroups.length !== state.activeBranch.childGroups.size ||
        sortedParents.length !== state.activeBranch.sortedParentNodes.length ||
        group.parentId !== state.activeBranch.group ||
        columnId !== state.activeBranch.column ||
        childGroups.some(
            (group) => !state.activeBranch.childGroups.has(group),
        ) ||
        sortedParents.some(
            (node, i) => node !== state.activeBranch.sortedParentNodes[i],
        );

    if (needsUpdate) {
        state.activeBranch = {
            childGroups: new Set<string>(childGroups),
            sortedParentNodes: sortedParents,
            group: group.parentId,
            column: columnId,
        };
    }
    if (!activeNodeOfGroup[columnId]) activeNodeOfGroup[columnId] = {};
    activeNodeOfGroup[columnId][group.parentId] = state.activeNode;
    for (const column of Object.values(activeNodeOfGroup)) {
        for (const group in column) {
            if (
                column[group] === state.activeNode &&
                group !== state.activeBranch.group
            ) {
                delete column[group];
            }
        }
    }
};
