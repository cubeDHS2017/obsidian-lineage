import { DefaultViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const selectionCommands = () => {
    const commands: DefaultViewCommand[] = [];
    commands.push(
        {
            name: 'extend_select_up',
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'up',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                        outlineMode:
                            view.plugin.settings.getValue().view
                                .singleColumnMode,
                    },
                });
            },
            hotkeys: [
                { key: 'K', modifiers: ['Shift'], editorState: 'editor-off' },
                {
                    key: 'ArrowUp',
                    modifiers: ['Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
        {
            name: 'extend_select_down',
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'down',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                        outlineMode:
                            view.plugin.settings.getValue().view
                                .singleColumnMode,
                    },
                });
            },
            hotkeys: [
                { key: 'J', modifiers: ['Shift'], editorState: 'editor-off' },
                {
                    key: 'ArrowDown',
                    modifiers: ['Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
        {
            name: 'extend_select_to_end_of_column',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/JUMP_TO_NODE',
                    payload: {
                        target: 'end-of-column',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                    },
                });
            },
            hotkeys: [
                { key: 'End', modifiers: ['Shift'], editorState: 'editor-off' },
            ],
        },
        {
            name: 'extend_select_to_start_of_column',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/JUMP_TO_NODE',
                    payload: {
                        target: 'start-of-column',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                    },
                });
            },
            hotkeys: [
                {
                    key: 'Home',
                    modifiers: ['Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
        {
            name: 'extend_select_to_end_of_group',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/JUMP_TO_NODE',
                    payload: {
                        target: 'end-of-group',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                    },
                });
            },
            hotkeys: [
                {
                    key: 'PageDown',
                    modifiers: ['Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
        {
            name: 'extend_select_to_start_of_group',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/JUMP_TO_NODE',
                    payload: {
                        target: 'start-of-group',
                        columns: view.documentStore.getValue().document.columns,
                    },
                    context: {
                        shiftKey: true,
                    },
                });
            },
            hotkeys: [
                {
                    key: 'PageUp',
                    modifiers: ['Shift'],
                    editorState: 'editor-off',
                },
            ],
        },
    );
    return commands;
};
