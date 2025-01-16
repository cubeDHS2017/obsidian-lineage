import { LineageView } from 'src/view/view';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { JumpTarget } from 'src/stores/view/reducers/document/jump-to-node';
import { DefaultViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
import { enableEditModeInMainSplit } from 'src/view/components/container/column/components/group/components/card/components/content/store-actions/enable-edit-mode-in-main-split';

const singleColumnMode = (view: LineageView) =>
    view.plugin.settings.getValue().view.singleColumnMode;

const maintainEditMode = (view: LineageView) =>
    view.plugin.settings.getValue().view.maintainEditMode;

const maybeEnableEditMode = (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const isEditing = viewState.document.editing.activeNodeId;
    const activeNode = viewState.document.activeNode;
    if (isEditing && maintainEditMode(view)) {
        setTimeout(() => {
            const newActiveNode = view.viewStore.getValue().document.activeNode;
            if (newActiveNode !== activeNode) {
                enableEditModeInMainSplit(view, newActiveNode);
            }
        }, 16);
    }
};

const spatialNavigation = (view: LineageView, direction: AllDirections) => {
    maybeEnableEditMode(view);
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
    maybeEnableEditMode(view);
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
    maybeEnableEditMode(view);
    view.viewStore.dispatch({
        type: 'DOCUMENT/JUMP_TO_NODE',
        payload: {
            target,
            columns: view.documentStore.getValue().document.columns,
        },
    });
};
export const navigateCommands = () => {
    const commands: DefaultViewCommand[] = [];
    commands.push(
        {
            name: 'go_right',
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'right');
                } else {
                    spatialNavigation(view, 'down');
                }
            },
            hotkeys: [
                { key: 'L', modifiers: [], editorState: 'editor-off' },
                { key: 'ArrowRight', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_left',
            callback: (view, event) => {
                event.preventDefault();

                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'left');
                } else {
                    spatialNavigation(view, 'up');
                }
            },
            hotkeys: [
                { key: 'H', modifiers: [], editorState: 'editor-off' },
                { key: 'ArrowLeft', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_down',
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'down');
                } else {
                    sequentialNavigation(view, 'forward');
                }
            },
            hotkeys: [
                { key: 'J', modifiers: [], editorState: 'editor-off' },
                { key: 'ArrowDown', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_up',
            callback: (view, event) => {
                event.preventDefault();
                if (!singleColumnMode(view)) {
                    spatialNavigation(view, 'up');
                } else {
                    sequentialNavigation(view, 'back');
                }
            },
            hotkeys: [
                { key: 'K', modifiers: [], editorState: 'editor-off' },
                { key: 'ArrowUp', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'select_parent',
            callback: (view, event) => {
                event.preventDefault();
                spatialNavigation(view, 'left');
            },
            hotkeys: [{ key: 'G', modifiers: [], editorState: 'editor-off' }],
        },
        {
            name: 'navigate_to_next_node',
            callback: (view, event) => {
                event.preventDefault();
                sequentialNavigation(view, 'forward');
            },
            hotkeys: [{ key: 'N', modifiers: [], editorState: 'editor-off' }],
        },
        {
            name: 'navigate_to_previous_node',
            callback: (view, event) => {
                event.preventDefault();
                sequentialNavigation(view, 'back');
            },
            hotkeys: [{ key: 'B', modifiers: [], editorState: 'editor-off' }],
        },
        {
            name: 'go_to_beginning_of_group',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'start-of-group');
            },
            hotkeys: [
                { key: 'PageUp', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_to_end_of_group',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'end-of-group');
            },
            hotkeys: [
                { key: 'PageDown', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_to_beginning_of_column',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'start-of-column');
            },
            hotkeys: [
                { key: 'Home', modifiers: [], editorState: 'editor-off' },
            ],
        },
        {
            name: 'go_to_end_of_column',
            callback: (view, e) => {
                e.preventDefault();
                e.stopPropagation();
                jump(view, 'end-of-column');
            },
            hotkeys: [{ key: 'End', modifiers: [], editorState: 'editor-off' }],
        },
        {
            name: 'navigate_back',
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/NAVIGATE_BACK',
                });
            },
            hotkeys: [{ key: 'J', modifiers: ['Alt'], editorState: 'both' }],
        },
        {
            name: 'navigate_forward',
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'NAVIGATION/NAVIGATE_FORWARD',
                });
            },
            hotkeys: [{ key: 'K', modifiers: ['Alt'], editorState: 'both' }],
        },
    );
    return commands;
};
