import { Settings } from 'src/stores/settings/settings-type';
import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const delayAlign = (action?: PluginAction) => {
    if (!action) return 0;
    let delay = 0;
    if (
        action.type === 'view/left-sidebar/toggle' ||
        action.type === 'VIEW/TOGGLE_MINIMAP'
    ) {
        delay = 300;
    } else if (action.type === 'DOCUMENT/DROP_NODE') {
        delay = 16;
    }
    return delay;
};

export const retryAlign = (settings: Settings, action: PluginAction) => {
    let retry = false;
    if (action.type === 'DOCUMENT/MOVE_NODE') {
        retry = true;
    } else if (action.type === 'DOCUMENT/INSERT_NODE') {
        if (settings.view.zoomLevel !== 1) {
            retry = true;
        }
    }
    return retry;
};
