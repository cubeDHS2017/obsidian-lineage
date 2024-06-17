import { PluginCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';
import {
    isActive,
    isActiveAndNotEditing,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';

export const navigateCommands = () => {
    const commands: PluginCommand[] = [];
    commands.push(
        {
            name: 'go_right',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'right',
                        columns: view.documentStore.getValue().document.columns,
                    },
                });
            },
            hotkeys: [
                { key: 'L', modifiers: [] },
                { key: 'ArrowRight', modifiers: [] },
            ],
        },
        {
            name: 'go_down',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'down',
                        columns: view.documentStore.getValue().document.columns,
                    },
                });
            },
            hotkeys: [
                { key: 'J', modifiers: [] },
                { key: 'ArrowDown', modifiers: [] },
            ],
        },
        {
            name: 'go_left',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'left',
                        columns: view.documentStore.getValue().document.columns,
                    },
                });
            },
            hotkeys: [
                { key: 'H', modifiers: [] },
                { key: 'ArrowLeft', modifiers: [] },
            ],
        },
        {
            name: 'go_up',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
                    payload: {
                        direction: 'up',
                        columns: view.documentStore.getValue().document.columns,
                    },
                });
            },
            hotkeys: [
                { key: 'K', modifiers: [] },
                { key: 'ArrowUp', modifiers: [] },
            ],
        },
        {
            name: 'go_to_beginning_of_group',
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
                });
            },
            hotkeys: [{ key: 'PageUp', modifiers: [] }],
        },
        {
            name: 'go_to_end_of_group',
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
                });
            },
            hotkeys: [{ key: 'PageDown', modifiers: [] }],
        },
        {
            name: 'go_to_beginning_of_column',
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
                });
            },
            hotkeys: [{ key: 'Home', modifiers: [] }],
        },
        {
            name: 'go_to_end_of_column',
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
                });
            },
            hotkeys: [{ key: 'End', modifiers: [] }],
        },
        {
            name: 'navigate_back',
            check: isActive,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/NAVIGATE_BACK',
                });
            },
            hotkeys: [{ key: 'J', modifiers: ['Alt'] }],
        },
        {
            name: 'navigate_forward',
            check: isActive,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/NAVIGATE_FORWARD',
                });
            },
            hotkeys: [{ key: 'K', modifiers: ['Alt'] }],
        },
        {
            name: 'navigate_to_next_node',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/SELECT_NEXT_NODE',
                    payload: {
                        direction: 'forward',
                        sections: view.documentStore.getValue().sections,
                    },
                });
            },
            hotkeys: [{ key: 'N', modifiers: [] }],
        },
        {
            name: 'navigate_to_previous_node',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/SELECT_NEXT_NODE',
                    payload: {
                        direction: 'back',
                        sections: view.documentStore.getValue().sections,
                    },
                });
            },
            hotkeys: [{ key: 'B', modifiers: [] }],
        },
    );
    return commands;
};
