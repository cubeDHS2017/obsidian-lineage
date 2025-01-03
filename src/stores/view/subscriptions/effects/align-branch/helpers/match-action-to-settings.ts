import { Settings } from 'src/stores/settings/settings-type';
import { PluginAction } from './match-action-to-params';

export type AlignBranchSettings = {
    behavior: ScrollBehavior;
    centerActiveNodeH: boolean;
    centerActiveNodeV: boolean;
    zoomLevel: number;
};

export const matchActionToSettings = (
    settings: Settings,
    previousGroupId: string,
    newGroupId: string,
    action?: PluginAction,
) => {
    const params: AlignBranchSettings = {
        behavior: 'smooth' as ScrollBehavior,
        centerActiveNodeH: settings.view.scrolling.centerActiveNodeH,
        centerActiveNodeV: settings.view.scrolling.centerActiveNodeV,
        zoomLevel: settings.view.zoomLevel,
    };

    if (!params.centerActiveNodeV) {
        params.centerActiveNodeV =
            action?.type === 'view/life-cycle/mount' ||
            action?.type === 'view/align-branch' ||
            (!settings.view.singleColumnMode &&
                (!previousGroupId || previousGroupId !== newGroupId));
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
