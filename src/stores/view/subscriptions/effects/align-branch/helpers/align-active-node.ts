import { alignElementVAndH } from 'src/lib/align-element/align-element-v-and-h';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const alignActiveNode = (context: AlignBranchContext) => {
    const element = getNodeElement(context.container, context.activeNode);
    if (!element) return;

    const result = alignElementVAndH(context, element);
    if (result?.columnId) {
        context.state.columns.add(result.columnId);
        if (!context.settings.centerActiveNodeV) {
            context.state.activeNodeRect = result.activeNodeRect;
        }
    }
};
