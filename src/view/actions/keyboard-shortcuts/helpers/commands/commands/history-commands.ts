import { isActiveAndNotEditingAndHasFile } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { PluginCommand } from 'src/lang/hotkey-groups';

export const historyCommands = () => {
    return [
        {
            name: 'undo_change',
            check: isActiveAndNotEditingAndHasFile,
            callback: (view) => {
                const path = view.documentStore.getValue().file.path;
                if (path)
                    view.documentStore.dispatch({
                        type: 'HISTORY/APPLY_PREVIOUS_SNAPSHOT',
                    });
            },
            hotkeys: [{ key: 'Z', modifiers: ['Mod', 'Shift'] }],
        },
        {
            name: 'redo_change',
            check: isActiveAndNotEditingAndHasFile,
            callback: (view) => {
                const path = view.documentStore.getValue().file.path;
                if (path)
                    view.documentStore.dispatch({
                        type: 'HISTORY/APPLY_NEXT_SNAPSHOT',
                    });
            },
            hotkeys: [{ key: 'Y', modifiers: ['Mod', 'Shift'] }],
        },
    ] satisfies PluginCommand[];
};
