import { mergeNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/merge-node';
import { DefaultViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const mergeCommands = () => {
    return [
        {
            name: 'merge_with_node_above',
            callback: (view) => {
                mergeNode(view, 'up');
            },
            hotkeys: [
                {
                    key: 'K',
                    modifiers: ['Mod', 'Shift'],
                    editorState: 'editor-off',
                },
                {
                    key: 'ArrowUp',
                    modifiers: ['Mod', 'Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
        {
            name: 'merge_with_node_below',
            callback: (view) => {
                mergeNode(view, 'down');
            },
            hotkeys: [
                {
                    key: 'J',
                    modifiers: ['Mod', 'Shift'],
                    editorState: 'editor-off',
                },
                {
                    key: 'ArrowDown',
                    modifiers: ['Mod', 'Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
    ] as DefaultViewCommand[];
};
