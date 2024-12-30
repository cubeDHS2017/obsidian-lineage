import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    ViewDocumentAction,
    ViewStoreAction,
} from 'src/stores/view/view-store-actions';
import { SettingsActions } from 'src/stores/settings/settings-reducer';
import { DocumentsStoreAction } from 'src/stores/documents/documents-store-actions';
import { LineageView } from 'src/view/view';

export type PluginAction =
    | DocumentStoreAction
    | ViewDocumentAction
    | ViewStoreAction
    | SettingsActions
    | DocumentsStoreAction
    | { type: 'view/life-cycle/mount' };

export const matchActionToParams = (
    view: LineageView,
    action: PluginAction,
) => {
    const skip =
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar;
    if (skip) return null;

    const settings = view.plugin.settings.getValue();
    const alignInactiveColumns = action.type === 'DOCUMENT/SPLIT_NODE';

    let behavior: ScrollBehavior = 'smooth';
    if (action.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) behavior = 'instant';
    } else if (action.type === 'DOCUMENT/LOAD_FILE') {
        behavior = 'instant';
    } else if (action.type === 'UI/CHANGE_ZOOM_LEVEL') {
        behavior = 'instant';
    }

    let delay = 0;
    let retry = false;
    if (
        action.type === 'view/left-sidebar/toggle' ||
        action.type === 'VIEW/TOGGLE_MINIMAP'
    ) {
        delay = 300;
    } else if (action.type === 'DOCUMENT/DROP_NODE') {
        delay = 16;
    }

    if (action.type === 'DOCUMENT/MOVE_NODE') {
        retry = true;
    } else if (action.type === 'DOCUMENT/INSERT_NODE') {
        if (settings.view.zoomLevel !== 1) {
            retry = true;
        }
    }

    const scrollFirstColumnToTheLeft =
        settings.view.scrolling.horizontalScrollingMode ===
            'reveal-active-card' &&
        (action.type === 'view/life-cycle/mount' ||
            action.type === 'UI/CHANGE_ZOOM_LEVEL');

    const centerActiveNode =
        // single-column-mode toggled on
        settings.view.singleColumnMode &&
        action.type === 'view/life-cycle/mount';
    return {
        behavior,
        delay,
        alignInactiveColumns,
        retry,
        scrollFirstColumnToTheLeft,
        centerActiveNode,
    };
};
