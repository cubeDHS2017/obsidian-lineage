import { scrollNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/scroll-node';
import { Modifier } from 'obsidian';
import { DefaultViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const scrollCommands = () => {
    const modifiers: Modifier[] = ['Mod', 'Alt'];
    return [
        {
            name: 'scroll_right',
            callback: (view) => {
                scrollNode(view, 'right');
            },
            hotkeys: [{ key: 'L', modifiers: modifiers, editorState: 'both' }],
        },
        {
            name: 'scroll_left',
            callback: (view) => {
                scrollNode(view, 'left');
            },
            hotkeys: [{ key: 'H', modifiers: modifiers, editorState: 'both' }],
        },
        {
            name: 'scroll_up',
            callback: (view) => {
                scrollNode(view, 'up');
            },
            hotkeys: [{ key: 'K', modifiers: modifiers, editorState: 'both' }],
        },
        {
            name: 'scroll_down',
            callback: (view) => {
                scrollNode(view, 'down');
            },
            hotkeys: [{ key: 'J', modifiers: modifiers, editorState: 'both' }],
        },
        {
            name: 'align_branch',
            callback: (view) => {
                view.alignBranch.align({
                    type: 'view/align-branch/center-node',
                });
            },
            hotkeys: [{ key: 'G', modifiers: modifiers, editorState: 'both' }],
        },
    ] satisfies DefaultViewCommand[];
};
