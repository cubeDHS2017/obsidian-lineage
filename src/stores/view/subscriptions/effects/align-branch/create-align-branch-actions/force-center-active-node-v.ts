import { getDocumentEventType } from 'src/stores/view/helpers/get-document-event-type';
import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const forceCenterActiveNodeV = (
    action: PluginAction,
    singleColumnMode: boolean,
) => {
    const actionType = action.type;
    let centerActiveNodeV = false;
    // @ts-ignore
    const type = getDocumentEventType(actionType);
    centerActiveNodeV =
        actionType === 'view/life-cycle/mount' ||
        actionType === 'view/align-branch/center-node' ||
        actionType === 'DOCUMENT/LOAD_FILE';

    if (!centerActiveNodeV && !singleColumnMode) {
        centerActiveNodeV =
            !!type.dropOrMove ||
            !!type.changeHistory ||
            (!!type.createOrDelete && action.type !== 'DOCUMENT/INSERT_NODE');
    }
    return centerActiveNodeV;
};
