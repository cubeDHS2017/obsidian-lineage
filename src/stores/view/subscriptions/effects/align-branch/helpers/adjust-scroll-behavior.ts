import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const adjustScrollBehavior = (action: PluginAction) => {
    let behavior: ScrollBehavior = 'smooth';

    if (action?.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) behavior = 'instant';
    } else if (action.type === 'DOCUMENT/LOAD_FILE') {
        behavior = 'instant';
    } else if (action.type === 'UI/CHANGE_ZOOM_LEVEL') {
        behavior = 'instant';
    }

    return behavior;
};
