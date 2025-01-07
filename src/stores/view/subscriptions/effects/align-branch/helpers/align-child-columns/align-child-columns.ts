import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignChildGroupOfColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-group-of-column';
import { alignInactiveColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-inactive-column';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignChildColumns = (context: AlignBranchContext) => {
    const alignInactiveColumns =
        context.alignInactiveColumns === undefined
            ? false
            : context.alignInactiveColumns;
    let previousActiveBranchNode: string | null =
        context.viewState.document.activeNode;
    for (const column of context.documentState.document.columns) {
        if (context.state.columns.has(column.id)) continue;

        const activeNodesOfColumn =
            context.viewState.document.activeNodesOfColumn[column.id];

        const activeBranchNode: string | null =
            activeNodesOfColumn && previousActiveBranchNode
                ? activeNodesOfColumn[previousActiveBranchNode]
                : null;
        previousActiveBranchNode = activeBranchNode;
        if (activeBranchNode) {
            const element = getNodeElement(context.container, activeBranchNode);
            if (element) {
                const columnId = alignElementVertically(context, element);
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
            } else if (alignInactiveColumns) {
                alignInactiveColumn(context, column);
            }
        }
    }
};
