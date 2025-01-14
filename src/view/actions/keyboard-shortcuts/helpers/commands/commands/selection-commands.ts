import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { DefaultViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const selectionCommands = () => {
    const commands: DefaultViewHotkey[] = [];
    commands.push(
        {
            name: 'extend_select_up',
            check: isActiveAndNotEditing,
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
                { key: 'K', modifiers: ['Shift'] },
                { key: 'ArrowUp', modifiers: ['Shift'] },
            ],
        },
        {
            name: 'extend_select_down',
            check: isActiveAndNotEditing,
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
                { key: 'J', modifiers: ['Shift'] },
                { key: 'ArrowDown', modifiers: ['Shift'] },
            ],
        },
        {
            name: 'extend_select_to_end_of_column',
            check: isActiveAndNotEditing,
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
            hotkeys: [{ key: 'End', modifiers: ['Shift'] }],
        },
        {
            name: 'extend_select_to_start_of_column',
            check: isActiveAndNotEditing,
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
            hotkeys: [{ key: 'Home', modifiers: ['Shift'] }],
        },
        {
            name: 'extend_select_to_end_of_group',
            check: isActiveAndNotEditing,
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
            hotkeys: [{ key: 'PageDown', modifiers: ['Shift'] }],
        },
        {
            name: 'extend_select_to_start_of_group',
            check: isActiveAndNotEditing,
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
            hotkeys: [{ key: 'PageUp', modifiers: ['Shift'] }],
        },
    );
    return commands;
};
