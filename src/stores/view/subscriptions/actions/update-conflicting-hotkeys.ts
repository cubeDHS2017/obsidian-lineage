import { LineageView } from 'src/view/view';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { getUsedHotkeys } from 'src/obsidian/helpers/get-used-hotkeys';

export const updateConflictingHotkeys = (view: LineageView) => {
    setTimeout(() => {
        hotkeyStore.dispatch({
            type: 'SET_CONFLICTING_HOTKEYS',
            payload: {
                conflictingHotkeys: getUsedHotkeys(view.plugin),
            },
        });
    }, 50);
};
