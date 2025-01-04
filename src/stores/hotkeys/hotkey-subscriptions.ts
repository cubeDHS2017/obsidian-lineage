import Lineage from 'src/main';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { getUsedHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';
import { updateCommandsDictionary } from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-commands-dictionary';

export const hotkeySubscriptions = (plugin: Lineage) => {
    hotkeyStore.subscribe((state, action, initialRun) => {
        if (initialRun) {
            updateCommandsDictionary(state.hotkeys);
            return;
        }
        if (!action) return;
        if (
            action.type === 'HOTKEY/RESET' ||
            action.type === 'HOTKEY/UPDATE' ||
            action.type === 'hotkeys/apply-preset' ||
            action.type === 'hotkeys/reset-all'
        ) {
            plugin.settings.dispatch({
                type: 'SET_CUSTOM_HOTKEYS',
                payload: {
                    customHotkeys: state.customHotkeys,
                },
            });
            hotkeyStore.dispatch({
                type: 'SET_CONFLICTING_HOTKEYS',
                payload: {
                    conflictingHotkeys: getUsedHotkeys(plugin),
                },
            });
            updateCommandsDictionary(state.hotkeys);
        }
    });
};
