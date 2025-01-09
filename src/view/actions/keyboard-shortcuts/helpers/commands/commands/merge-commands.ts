import { mergeNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/merge-node';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { DefaultViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const mergeCommands = () => {
    return [
        {
            name: 'merge_with_node_above',
            check: isActiveAndNotEditing,
            callback: (view) => {
                mergeNode(view, 'up');
            },
            hotkeys: [
                { key: 'K', modifiers: ['Mod', 'Shift'] },
                { key: 'ArrowUp', modifiers: ['Mod', 'Shift'] },
            ],
        },
        {
            name: 'merge_with_node_below',
            check: isActiveAndNotEditing,
            callback: (view) => {
                mergeNode(view, 'down');
            },
            hotkeys: [
                { key: 'J', modifiers: ['Mod', 'Shift'] },
                { key: 'ArrowDown', modifiers: ['Mod', 'Shift'] },
            ],
        },
    ] as DefaultViewHotkey[];
};
