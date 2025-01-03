import { isActive } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { PluginCommand } from 'src/lang/hotkey-groups';
import { scrollNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/scroll-node';
import { Modifier } from 'obsidian';

export const scrollCommands = () => {
    const modifiers: Modifier[] = ['Mod', 'Alt'];
    return [
        {
            name: 'scroll_right',
            check: isActive,
            callback: (view) => {
                scrollNode(view, 'right');
            },
            hotkeys: [{ key: 'L', modifiers: modifiers }],
        },
        {
            name: 'scroll_left',
            check: isActive,
            callback: (view) => {
                scrollNode(view, 'left');
            },
            hotkeys: [{ key: 'H', modifiers: modifiers }],
        },
        {
            name: 'scroll_up',
            check: isActive,
            callback: (view) => {
                scrollNode(view, 'up');
            },
            hotkeys: [{ key: 'K', modifiers: modifiers }],
        },
        {
            name: 'scroll_down',
            check: isActive,
            callback: (view) => {
                scrollNode(view, 'down');
            },
            hotkeys: [{ key: 'J', modifiers: modifiers }],
        },
        {
            name: 'align_branch',
            check: isActive,
            callback: (view) => {
                view.alignBranch.align({ type: 'view/align-branch' });
            },
            hotkeys: [{ key: 'G', modifiers: modifiers }],
        },
    ] satisfies PluginCommand[];
};
