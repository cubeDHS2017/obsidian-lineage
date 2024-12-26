import Lineage from 'src/main';
import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { navigateCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/navigate-commands';
import { editCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/edit-commands';
import { createCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/create-commands';
import { moveCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/move-commands';
import { mergeCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/merge-commands';
import {
    isActive,
    isActiveAndNotEditing,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { historyCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/history-commands';
import { clipboardCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/clipboard-commands';
import { mapCtrlToMod } from 'src/stores/settings/migrations/map-ctrl-to-mod';
import { selectionCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/selection-commands';
import { scrollCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/scroll-commands';
import { deleteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/delete-node';

export const pluginCommands: {
    current: PluginCommand[] | null;
} = {
    current: null,
};

export const loadCommands = (plugin: Lineage) => {
    pluginCommands.current = [
        ...navigateCommands(),
        ...editCommands(),
        ...createCommands(),
        ...moveCommands(),
        ...mergeCommands(),
        ...clipboardCommands(),
        ...historyCommands(),
        ...selectionCommands(),
        ...scrollCommands(),
        {
            name: 'delete_card',
            check: isActiveAndNotEditing,
            callback: (view) => {
                const document = view.viewStore.getValue().document;

                deleteNode(view, document.activeNode, true);
            },
            hotkeys: [{ key: 'Backspace', modifiers: ['Mod'] }],
        },
        {
            name: 'toggle_search_input',
            check: isActiveAndNotEditing,
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                view.viewStore.dispatch({ type: 'SEARCH/TOGGLE_INPUT' });
            },
            hotkeys: [
                { key: '/', modifiers: [] },
                { key: 'f', modifiers: ['Alt'] },
            ],
        },
        {
            name: 'zoom_in',
            check: isActive,
            callback: (view, e) => {
                e.preventDefault();
                view.plugin.settings.dispatch({
                    type: 'UI/CHANGE_ZOOM_LEVEL',
                    payload: { direction: 'in' },
                });
            },
            hotkeys: [{ key: '=', modifiers: ['Mod'] }],
        },
        {
            name: 'zoom_out',
            check: isActive,
            callback: (view, e) => {
                e.preventDefault();
                view.plugin.settings.dispatch({
                    type: 'UI/CHANGE_ZOOM_LEVEL',
                    payload: { direction: 'out' },
                });
            },
            hotkeys: [{ key: '-', modifiers: ['Mod'] }],
        },
        {
            name: 'zoom_reset',
            check: isActive,
            callback: (view, e) => {
                e.preventDefault();
                view.plugin.settings.dispatch({
                    type: 'UI/CHANGE_ZOOM_LEVEL',
                    payload: { value: 1 },
                });
            },
            hotkeys: [{ key: '0', modifiers: ['Mod'] }],
        },
    ];
    hotkeyStore.dispatch({
        type: 'SETTINGS/LOAD_CUSTOM_HOTKEYS',
        payload: {
            customHotkeys: mapCtrlToMod(
                plugin.settings.getValue().hotkeys.customHotkeys,
            ),
        },
    });
};
