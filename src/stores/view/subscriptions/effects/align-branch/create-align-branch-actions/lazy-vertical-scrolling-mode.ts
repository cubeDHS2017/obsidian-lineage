import { AlignBranchAction } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/create-align-branch-actions';
import {
    AlignBranchContext,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const lazyVerticalScrollingMode = (
    context: Pick<AlignBranchContext, 'previousActiveBranch' | 'activeBranch'>,
    action: PluginAction,
) => {
    const actions: AlignBranchAction[] = [];

    if (action.type === 'DOCUMENT/INSERT_NODE') {
        if (action.payload.position === 'right') {
            actions.push({
                action: '20/active-node/vertical/align-with-parent',
            });
        } else {
            actions.push({ action: '20/active-node/vertical/reveal' });
        }
    } else {
        actions.push({ action: '20/active-node/vertical/reveal' });
        const previousActiveBranch = context.previousActiveBranch;
        const activeBranch = context.activeBranch;
        if (previousActiveBranch) {
            const isChildOfPreviousNode =
                previousActiveBranch.group === activeBranch.group ||
                previousActiveBranch.node === activeBranch.group;
            const isParentOfPreviousNode =
                previousActiveBranch.group === activeBranch.node;

            const isMovingLeft =
                isParentOfPreviousNode ||
                (!isChildOfPreviousNode &&
                    activeBranch.sortedParentNodes.every((p, i) => {
                        return previousActiveBranch!.sortedParentNodes[i] === p;
                    }));

            if (!(isChildOfPreviousNode || isMovingLeft)) {
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
    }
    return actions;
};
