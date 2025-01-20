import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { CreateActionsContext } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/create-align-branch-actions';

export const forceCenterActiveNodeH = (
    context: CreateActionsContext,
    action: PluginAction,
) => {
    if (action.type === 'view/life-cycle/mount') {
        /* active node is in the first or second column*/
        return context.activeBranch.sortedParentNodes.length < 2;
    }
};
