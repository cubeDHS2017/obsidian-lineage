import { Column } from 'src/stores/document/document-state-type';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const alignInactiveColumn = (
    context: AlignBranchContext,
    column: Column,
) => {
    const nodes = column.groups.map((g) => g.nodes).flat();
    if (nodes.length <= 0) return;

    const lastNodeElement = getNodeElement(
        context.container,
        nodes[nodes.length - 1],
    );
    if (!lastNodeElement) return;
    alignElementVertically(context, lastNodeElement);
};
