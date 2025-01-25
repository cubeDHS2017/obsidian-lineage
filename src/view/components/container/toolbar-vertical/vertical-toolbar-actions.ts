import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';
import { lang } from 'src/lang/lang';

export class VerticalToolbarActions {
    constructor(private view: LineageView) {}

    handleNextClick = () => {
        if (this.view.viewStore.getValue().document.editing.activeNodeId)
            new Notice(lang.error_apply_snapshot_while_editing);
        else
            this.view.documentStore.dispatch({
                type: 'HISTORY/APPLY_NEXT_SNAPSHOT',
            });
    };

    handlePreviousClick = () => {
        if (this.view.viewStore.getValue().document.editing.activeNodeId)
            new Notice(lang.error_apply_snapshot_while_editing);
        else
            this.view.documentStore.dispatch({
                type: 'HISTORY/APPLY_PREVIOUS_SNAPSHOT',
            });
    };

    toggleHelp = () => {
        this.view.viewStore.dispatch({ type: 'UI/TOGGLE_HELP_SIDEBAR' });
    };

    toggleStyleRules = () => {
        this.view.viewStore.dispatch({
            type: 'view/modals/toggle-style-rules',
        });
    };
    toggleSettings = () => {
        this.view.viewStore.dispatch({ type: 'UI/TOGGLE_SETTINGS_SIDEBAR' });
    };

    toggleMinimap = () => {
        this.view.plugin.settings.dispatch({
            type: 'VIEW/TOGGLE_MINIMAP',
        });
    };
    toggleScrollModeH = () => {
        this.view.plugin.settings.dispatch({
            type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE',
        });
    };
    toggleScrollModeV = () => {
        this.view.plugin.settings.dispatch({
            type: 'settings/view/scrolling/toggle-vertical-scrolling-mode',
        });
    };

    toggleGap = () => {
        this.view.plugin.settings.dispatch({
            type: 'view/modes/gap-between-cards/toggle',
        });
    };
    toggleOutlineMode = () => {
        this.view.plugin.settings.dispatch({
            type: 'settings/view/modes/toggle-outline-mode',
        });
    };

    toggleSnapshotsModal = () =>
        this.view.viewStore.dispatch({
            type: 'UI/TOGGLE_HISTORY_SIDEBAR',
        });

    zoomIn = () => {
        this.view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'in' },
        });
    };
    zoomOut = () => {
        this.view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'out' },
        });
    };
}
