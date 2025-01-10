import {
    AlignBranchAction,
    Props,
} from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/create-align-branch-actions';

export const lazyVerticalScrollingMode = (props: Props) => {
    const actions: AlignBranchAction[] = [];

    const action = props.action;
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
            props.previousActiveBranch &&
            (props.previousActiveBranch.group === props.activeBranch.group ||
                props.previousActiveBranch.node === props.activeBranch.group);
        const isParentOfPreviousNode =
            props.previousActiveBranch &&
            props.previousActiveBranch.group === props.activeBranch.node;

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
