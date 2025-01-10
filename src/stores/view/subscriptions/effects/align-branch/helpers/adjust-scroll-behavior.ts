import {
    PluginAction,
    PreviousScrollBehavior,
} from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const adjustScrollBehavior = (
    action: PluginAction,
    previousBehavior: PreviousScrollBehavior | null,
) => {
    let behavior: ScrollBehavior = 'smooth';
    const actionType = action.type;

    if (action?.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) behavior = 'instant';
    } else if (actionType === 'DOCUMENT/LOAD_FILE') {
        behavior = 'instant';
    } else if (actionType === 'UI/CHANGE_ZOOM_LEVEL') {
        behavior = 'instant';
    }

    if (previousBehavior) {
        if (previousBehavior.behavior !== behavior) {
            const timeSinceLastBehavior =
                Date.now() - previousBehavior.timestamp;
            if (timeSinceLastBehavior < 1000) {
                behavior = previousBehavior.behavior;
            }
        }
    }

    return behavior;
};
