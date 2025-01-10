import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const skipAlign = (action?: PluginAction) => {
    return (
        action &&
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar
    );
};
