import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const adjustScrollBehavior = (action: PluginAction) => {
    let behavior: ScrollBehavior = 'smooth';

    if (action.type === 'view/update-active-branch?source=document') {
        const documentAction = action.context.documentAction;
        const documentEvent = documentAction.type;
        if (documentEvent === 'DOCUMENT/LOAD_FILE') {
            behavior = 'instant';
        } else if (documentEvent === 'DOCUMENT/MOVE_NODE') {
            const verticalMove =
                documentAction.payload.direction === 'down' ||
                documentAction.payload.direction === 'up';
            if (verticalMove) behavior = 'instant';
        }
    } else if (action.type === 'UI/CHANGE_ZOOM_LEVEL') {
        behavior = 'instant';
    }

    return behavior;
};
