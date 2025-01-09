import { Settings } from 'src/stores/settings/settings-type';
import { PluginAction } from './match-action-to-params';
import { getDocumentEventType } from 'src/stores/view/helpers/get-document-event-type';

export type AlignBranchSettings = {
    behavior: ScrollBehavior;
    centerActiveNodeH: boolean;
    centerActiveNodeV: boolean;
    zoomLevel: number;
};

export const matchActionToSettings = (
    settings: Settings,
    /*  isNewGroup: boolean,*/
    action?: PluginAction,
) => {
    const params: AlignBranchSettings = {
        behavior: 'smooth' as ScrollBehavior,
        centerActiveNodeH: settings.view.scrolling.centerActiveNodeH,
        centerActiveNodeV: settings.view.scrolling.centerActiveNodeV,
        zoomLevel: settings.view.zoomLevel,
    };

    const actionType = action?.type;
    if (!params.centerActiveNodeV && action) {
        // @ts-ignore
        const type = getDocumentEventType(actionType);
        params.centerActiveNodeV =
            actionType === 'view/life-cycle/mount' ||
            actionType === 'view/align-branch' ||
            actionType === 'DOCUMENT/LOAD_FILE';

        if (!params.centerActiveNodeV && !settings.view.singleColumnMode) {
            params.centerActiveNodeV =
                !!type.dropOrMove ||
                !!type.changeHistory ||
                !!type.createOrDelete;
            if (type.createOrDelete) {
                if (
                    action.type === 'DOCUMENT/INSERT_NODE' &&
                    action.payload.position !== 'right'
                )
                    params.centerActiveNodeV = false;
            }
        }
    }
    if (!action) return params;

    if (action?.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) params.behavior = 'instant';
    } else if (actionType === 'DOCUMENT/LOAD_FILE') {
        params.behavior = 'instant';
    } else if (actionType === 'UI/CHANGE_ZOOM_LEVEL') {
        params.behavior = 'instant';
    }

    if (
        settings.view.singleColumnMode &&
        actionType === 'view/life-cycle/mount'
    ) {
        params.centerActiveNodeH = true;
    }
    return params;
};
