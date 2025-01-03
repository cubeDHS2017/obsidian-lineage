import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignParentsNodes = (context: AlignBranchContext) => {
    for (const id of context.activeBranch.sortedParentNodes) {
        const element = getNodeElement(context.container, id);
        if (!element) continue;

        const columnId = alignElementVertically(
            context.container,
            element,
            context.settings.zoomLevel,
            true,
            context.settings.behavior,
        );
        if (columnId) context.state.columns.add(columnId);
    }
};
