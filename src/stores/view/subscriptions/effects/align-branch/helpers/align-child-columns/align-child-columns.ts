import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignChildGroupOfColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-group-of-column';
import { alignInactiveColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-inactive-column';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';

const getActiveNodeOfGroup = (
    context: AlignBranchContext,
    column: string,
    previousActiveNode: string | null,
) => {
    const activeNodesOfColumn = context.viewState.document.activeNodesOfColumn;
    return activeNodesOfColumn[column] && previousActiveNode
        ? activeNodesOfColumn[column][previousActiveNode]
        : null;
};
export const alignChildColumns = (context: AlignBranchContext) => {
    const documentState = context.documentState;
    const columns = documentState.document.columns;
    const activeNode = context.viewState.document.activeNode;
    let previousActiveNode: string | null = activeNode;
    const activeNodeColumn = findNodeColumn(columns, activeNode);

    for (let i = activeNodeColumn + 1; i < columns.length; i++) {
        const column = columns[i];
        if (context.state.columns.has(column.id)) continue;

        const activeNodeOfGroup = getActiveNodeOfGroup(
            context,
            column.id,
            previousActiveNode,
        );
        previousActiveNode = activeNodeOfGroup;

        if (activeNodeOfGroup) {
            const element = getNodeElement(
                context.container,
                activeNodeOfGroup,
            );
            if (element) {
                const columnId = alignElementVertically(
                    context,
                    element,
                    context.settings.centerActiveNodeV,
                );
                if (columnId) context.state.columns.add(columnId);
            }
        } else {
            const childGroup = column.groups.find((g) =>
                context.viewState.document.activeBranch.childGroups.has(
                    g.parentId,
                ),
            );
            if (childGroup) {
                alignChildGroupOfColumn(context, column.id);
            } else if (context.alignInactiveColumns) {
                alignInactiveColumn(context, column);
            }
        }
    }
};
