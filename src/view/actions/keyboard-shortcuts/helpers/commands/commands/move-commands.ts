import { moveNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/move-node';
import { isActive } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { DefaultViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const moveCommands = () => {
    return [
        {
            name: 'move_node_up',
            check: isActive,
            callback: (view) => {
                moveNode(view, 'up');
            },
            hotkeys: [
                { key: 'K', modifiers: ['Alt', 'Shift'] },
                { key: 'ArrowUp', modifiers: ['Alt', 'Shift'] },
            ],
        },
        {
            name: 'move_node_down',
            check: isActive,
            callback: (view) => {
                moveNode(view, 'down');
            },
            hotkeys: [
                { key: 'J', modifiers: ['Alt', 'Shift'] },
                { key: 'ArrowDown', modifiers: ['Alt', 'Shift'] },
            ],
        },
        {
            name: 'move_node_right',
            check: isActive,
            callback: (view) => {
                moveNode(view, 'right');
            },
            hotkeys: [
                { key: 'L', modifiers: ['Alt', 'Shift'] },
                { key: 'ArrowRight', modifiers: ['Alt', 'Shift'] },
            ],
        },
        {
            name: 'move_node_left',
            check: isActive,
            callback: (view) => {
                moveNode(view, 'left');
            },
            hotkeys: [
                { key: 'H', modifiers: ['Alt', 'Shift'] },
                { key: 'ArrowLeft', modifiers: ['Alt', 'Shift'] },
            ],
        },
    ] satisfies DefaultViewHotkey[];
};
