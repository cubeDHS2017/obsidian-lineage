import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
import { cancelChanges } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cancel-changes';
import { PluginCommand } from 'src/lang/hotkey-groups';
import {
    isActiveAndEditing,
    isActiveAndNotEditing,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';

export const editCommands = () => {
    return [
        {
            name: 'enable_edit_mode',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                view.viewStore.dispatch({
                    type: 'view/main/enable-edit',
                    payload: {
                        nodeId: view.viewStore.getValue().document.activeNode,
                    },
                });
            },
            hotkeys: [{ key: 'Enter', modifiers: [] }],
        },
        {
            name: 'enable_edit_mode_and_place_cursor_at_start',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                const nodeId = view.viewStore.getValue().document.activeNode;
                view.inlineEditor.setNodeCursor(nodeId, { line: 0, ch: 0 });
                view.viewStore.dispatch({
                    type: 'view/main/enable-edit',
                    payload: {
                        nodeId: nodeId,
                    },
                });
            },
            hotkeys: [{ key: 'Enter', modifiers: ['Shift'] }],
        },
        {
            name: 'enable_edit_mode_and_place_cursor_at_end',
            check: isActiveAndNotEditing,
            callback: (view, event) => {
                event.preventDefault();
                const nodeId = view.viewStore.getValue().document.activeNode;
                view.inlineEditor.deleteNodeCursor(nodeId);
                view.viewStore.dispatch({
                    type: 'view/main/enable-edit',
                    payload: {
                        nodeId: nodeId,
                    },
                });
            },
            hotkeys: [{ key: 'Enter', modifiers: ['Alt'] }],
        },
        {
            name: 'save_changes_and_exit_card',
            check: isActiveAndEditing,
            callback: (view) => {
                saveNodeContent(view);
            },
            hotkeys: [{ key: 'Enter', modifiers: ['Shift', 'Mod'] }],
        },

        {
            name: 'disable_edit_mode',
            check: isActiveAndEditing,
            callback: (view) => {
                cancelChanges(view);
            },
            hotkeys: [{ key: 'Escape', modifiers: [] }],
        },
    ] satisfies PluginCommand[];
};
