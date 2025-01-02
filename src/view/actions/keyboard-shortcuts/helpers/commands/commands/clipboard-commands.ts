import { PluginCommand } from 'src/lang/hotkey-groups';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { copyActiveBranchesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branches-to-clipboard';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';
import { copyActiveNodesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-nodes-to-clipboard';

export const clipboardCommands = () => {
    return [
        {
            name: 'copy_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                const selectedText = activeWindow.getSelection()?.toString();
                if (selectedText && selectedText.length > 0) {
                    return;
                }
                event.preventDefault();
                copyActiveBranchesToClipboard(view, true);
            },
            hotkeys: [{ key: 'C', modifiers: ['Mod'] }],
        },
        {
            name: 'copy_node_unformatted',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                copyActiveBranchesToClipboard(view, false);
            },
            hotkeys: [{ key: 'C', modifiers: ['Mod', 'Alt'] }],
        },
        {
            name: 'copy_node_without_subitems',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                copyActiveNodesToClipboard(view);
            },
            hotkeys: [{ key: 'C', modifiers: ['Mod', 'Shift'] }],
        },
        {
            name: 'cut_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                cutNode(view);
            },
            hotkeys: [{ key: 'X', modifiers: ['Mod'] }],
        },
        {
            name: 'paste_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                pasteNode(view);
            },
            hotkeys: [{ key: 'V', modifiers: ['Mod'] }],
        },
    ] satisfies PluginCommand[];
};
