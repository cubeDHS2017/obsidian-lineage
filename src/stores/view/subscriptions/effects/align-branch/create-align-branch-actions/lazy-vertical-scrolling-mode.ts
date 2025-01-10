import { AlignBranchAction } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/create-align-branch-actions';
import {
    AlignBranchContext,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const lazyVerticalScrollingMode = (
    context: AlignBranchContext,
    action: PluginAction | undefined,
) => {
    const actions: AlignBranchAction[] = [];

    const createNodeAction = action && action?.type === 'DOCUMENT/INSERT_NODE';
    if (createNodeAction) {
        if (action.payload.position === 'right') {
            actions.push({
                action: '20/active-node/vertical/align-with-parent',
            });
        } else {
            actions.push({ action: '20/active-node/vertical/reveal' });
        }
    } else {
        actions.push({ action: '20/active-node/vertical/reveal' });
        const isChildOfPreviousNode =
            context.previousActiveBranch &&
            (context.previousActiveBranch.group ===
                context.activeBranch.group ||
                context.previousActiveBranch.node ===
                    context.activeBranch.group);
        const isParentOfPreviousNode =
            context.previousActiveBranch &&
            context.previousActiveBranch.group === context.activeBranch.node;

        if (!isChildOfPreviousNode) {
            actions.push({
                action: '30/parents/vertical/align-with-active-node',
            });
        }
        if (!isParentOfPreviousNode) {
            actions.push({
                action: '40/children/vertical/align-with-active-node',
            });
        }
    }
    return actions;
};
