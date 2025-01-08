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

    if (!params.centerActiveNodeV && action) {
        // @ts-ignore
        const type = getDocumentEventType(action.type);
        params.centerActiveNodeV =
            action?.type === 'view/life-cycle/mount' ||
            action?.type === 'view/align-branch' ||
            type.dropOrMove ||
            type.changeHistory ||
            type.clipboard ||
            action.type === 'DOCUMENT/DELETE_NODE';
    }
    if (!action) return params;

    if (action.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) params.behavior = 'instant';
    } else if (action.type === 'DOCUMENT/LOAD_FILE') {
        params.behavior = 'instant';
    } else if (action.type === 'UI/CHANGE_ZOOM_LEVEL') {
        params.behavior = 'instant';
    }

    if (
        settings.view.singleColumnMode &&
        action.type === 'view/life-cycle/mount'
    ) {
        params.centerActiveNodeH = true;
    }
    return params;
};
