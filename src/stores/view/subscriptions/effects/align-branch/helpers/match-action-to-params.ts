import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    ViewDocumentAction,
    ViewStoreAction,
} from 'src/stores/view/view-store-actions';
import { SettingsActions } from 'src/stores/settings/settings-reducer';
import { DocumentsStoreAction } from 'src/stores/documents/documents-store-actions';
import { Settings } from 'src/stores/settings/settings-type';

export type AlignBranchParams = {
    delay: number;
    retry: boolean;
    alignInactiveColumns: boolean;
    scrollFirstColumnToTheLeft: boolean;
};

export const defaultAlignBranchParams = (): AlignBranchParams => ({
    alignInactiveColumns: false,
    scrollFirstColumnToTheLeft: false,
    delay: 0,
    retry: false,
});

export type PluginAction =
    | DocumentStoreAction
    | ViewDocumentAction
    | ViewStoreAction
    | SettingsActions
    | DocumentsStoreAction
    | { type: 'view/life-cycle/mount' }
    | { type: 'view/align-branch' };

export const matchActionToParams = (
    settings: Settings,
    action?: PluginAction,
): AlignBranchParams | null => {
    const skip =
        action &&
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar;
    if (skip) return null;

    const params = defaultAlignBranchParams();
    if (!action) return params;

    if (
        action.type === 'view/left-sidebar/toggle' ||
        action.type === 'VIEW/TOGGLE_MINIMAP'
    ) {
        params.delay = 300;
    } else if (action.type === 'DOCUMENT/DROP_NODE') {
        params.delay = 16;
    }

    if (action.type === 'DOCUMENT/MOVE_NODE') {
        params.retry = true;
    } else if (action.type === 'DOCUMENT/INSERT_NODE') {
        if (settings.view.zoomLevel !== 1) {
            params.retry = true;
        }
    }

    params.alignInactiveColumns =
        action.type === 'DOCUMENT/SPLIT_NODE' ||
        action.type === 'view/life-cycle/mount';

    params.scrollFirstColumnToTheLeft =
        !settings.view.scrolling.centerActiveNodeH &&
        (action.type === 'view/life-cycle/mount' ||
            action.type === 'UI/CHANGE_ZOOM_LEVEL');
    return params;
};
