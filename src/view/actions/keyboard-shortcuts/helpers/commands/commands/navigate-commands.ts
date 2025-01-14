import {
    isActive,
    isActiveAndNotEditing,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { LineageView } from 'src/view/view';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { JumpTarget } from 'src/stores/view/reducers/document/jump-to-node';
import { DefaultViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

const singleColumnMode = (view: LineageView) =>
    view.plugin.settings.getValue().view.singleColumnMode;

const spatialNavigation = (view: LineageView, direction: AllDirections) => {
    view.viewStore.dispatch({
        type: 'DOCUMENT/NAVIGATE_USING_KEYBOARD',
        payload: {
            direction: direction,
            columns: view.documentStore.getValue().document.columns,
        },
        context: {
            outlineMode: singleColumnMode(view),
        },
    });
};

const sequentialNavigation = (
    view: LineageView,
    direction: 'forward' | 'back',
) => {
    view.viewStore.dispatch({
        type: 'NAVIGATION/SELECT_NEXT_NODE',
        payload: {
            direction,
            sections: view.documentStore.getValue().sections,
        },
        context: {
            outlineMode: singleColumnMode(view),
        },
    });
};

const jump = (view: LineageView, target: JumpTarget) => {
    view.viewStore.dispatch({
        type: 'DOCUMENT/JUMP_TO_NODE',
        payload: {
            target,
            columns: view.documentStore.getValue().document.columns,
        },
    });
};
export const navigateCommands = () => {
    const commands: DefaultViewHotkey[] = [];
    commands.push(
        {
            name: 'go_right',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'right');
                } else {
                    spatialNavigation(view, 'down');
                }
            },
            hotkeys: [
                { key: 'L', modifiers: [] },
                { key: 'ArrowRight', modifiers: [] },
            ],
        },
        {
            name: 'go_left',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();

                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'left');
                } else {
                    spatialNavigation(view, 'up');
                }
            },
            hotkeys: [
                { key: 'H', modifiers: [] },
                { key: 'ArrowLeft', modifiers: [] },
            ],
        },
        {
            name: 'go_down',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'down');
                } else {
                    sequentialNavigation(view, 'forward');
                }
            },
            hotkeys: [
                { key: 'J', modifiers: [] },
                { key: 'ArrowDown', modifiers: [] },
            ],
        },
        {
            name: 'go_up',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'up');
                } else {
                    sequentialNavigation(view, 'back');
                }
            },
            hotkeys: [
                { key: 'K', modifiers: [] },
                { key: 'ArrowUp', modifiers: [] },
            ],
        },
        {
            name: 'select_parent',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                spatialNavigation(view, 'left');
            },
            hotkeys: [{ key: 'G', modifiers: [] }],
        },
        {
            name: 'navigate_to_next_node',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                sequentialNavigation(view, 'forward');
            },
            hotkeys: [{ key: 'N', modifiers: [] }],
        },
        {
            name: 'navigate_to_previous_node',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                sequentialNavigation(view, 'back');
            },
            hotkeys: [{ key: 'B', modifiers: [] }],
        },
        {
            name: 'go_to_beginning_of_group',
            check: isActiveAndNotEditing,
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'start-of-group');
            },
            hotkeys: [{ key: 'PageUp', modifiers: [] }],
        },
        {
            name: 'go_to_end_of_group',
            check: isActiveAndNotEditing,
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'end-of-group');
            },
            hotkeys: [{ key: 'PageDown', modifiers: [] }],
        },
        {
            name: 'go_to_beginning_of_column',
            check: isActiveAndNotEditing,
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'start-of-column');
            },
            hotkeys: [{ key: 'Home', modifiers: [] }],
        },
        {
            name: 'go_to_end_of_column',
            check: isActiveAndNotEditing,
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'end-of-column');
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
    );
    return commands;
};
