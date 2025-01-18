import { getDocumentEventType } from 'src/stores/view/helpers/get-document-event-type';
import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const forceCenterActiveNodeV = (action: PluginAction) => {
    let centerActiveNodeV = false;
    centerActiveNodeV =
        action.type === 'view/life-cycle/mount' ||
        action.type === 'DOCUMENT/LOAD_FILE';

    if (!centerActiveNodeV) {
        // @ts-ignore
        const type = getDocumentEventType(action.type);
        centerActiveNodeV =
            !!type.dropOrMove ||
            !!type.changeHistory ||
            (!!type.createOrDelete && action.type !== 'DOCUMENT/INSERT_NODE');
    }
    return centerActiveNodeV;
};
