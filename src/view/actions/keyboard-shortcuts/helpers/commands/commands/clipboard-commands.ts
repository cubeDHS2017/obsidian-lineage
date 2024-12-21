import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { copyActiveBranchesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branches-to-clipboard';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';

export const clipboardCommands = () => {
    return [
        {
            name: 'copy_node',
            check: isActiveAndNotEditing,
            callback: async (view, event) => {
                event.preventDefault();
                copyActiveBranchesToClipboard(view, true);
            },
            hotkeys: [{ key: 'C', modifiers: ['Mod'] }],
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
