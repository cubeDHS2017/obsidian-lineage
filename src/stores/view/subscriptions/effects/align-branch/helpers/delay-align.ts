import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const delayAlign = (action: PluginAction) => {
    let delay = 0;
    if (
        action.type === 'view/left-sidebar/toggle' ||
        action.type === 'VIEW/TOGGLE_MINIMAP'
    ) {
        delay = 300;
    } else if (action.type === 'DOCUMENT/DROP_NODE') {
        delay = 32;
    }
    return delay;
};
