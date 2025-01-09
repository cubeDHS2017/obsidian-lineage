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
import { selectionCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/selection-commands';
import { scrollCommands } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/scroll-commands';
import { deleteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/delete-node';
import { LineageView } from 'src/view/view';
import { Hotkey } from 'obsidian';
import { CommandName, GroupName } from 'src/lang/hotkey-groups';

export type DefaultViewHotkey = {
    check: (view: LineageView) => boolean;
    callback: (view: LineageView, event: KeyboardEvent) => void;
    hotkeys: Hotkey[];
    name: CommandName;
};
export type ExtendedHotkey = Hotkey & {
    string_representation: string;
    obsidianConflict?: string;
    pluginConflict?: string;
    isCustom?: boolean;
};
export type ViewHotkey = {
    check: (view: LineageView) => boolean;
    callback: (view: LineageView, event: KeyboardEvent) => void;
    hotkeys: ExtendedHotkey[];
    name: CommandName;
    group: GroupName;
};

export const defaultViewHotkeys = (): DefaultViewHotkey[] => [
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
