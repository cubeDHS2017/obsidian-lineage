import { CustomHotkeys } from 'src/stores/settings/settings-type';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

/* temporary migration for existing non-mac users to map ctrl to mod */
export const mapCtrlToMod = (customHotkeys: CustomHotkeys) => {
    if (!isMacLike) {
        for (const value of Object.values(customHotkeys)) {
            if (value.primary) {
                const hotkey = value.primary;
                if (hotkey && 'modifiers' in hotkey) {
                    hotkey.modifiers = hotkey.modifiers.map((m) =>
                        m === 'Ctrl' ? 'Mod' : m,
                    );
                }
            }
            if (value.secondary) {
                const hotkey = value.secondary;
                if (hotkey && 'modifiers' in hotkey) {
                    hotkey.modifiers = hotkey.modifiers.map((m) =>
                        m === 'Ctrl' ? 'Mod' : m,
                    );
                }
            }
        }
    }
    return customHotkeys;
};
