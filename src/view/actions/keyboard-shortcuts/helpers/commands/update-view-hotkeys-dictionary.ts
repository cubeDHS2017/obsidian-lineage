import { hotkeyToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/hotkey-to-string';
import { ViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export enum Modifiers {
    'Alt' = 'Alt',
    'Mod' = 'Mod',
    'Shift' = 'Shift',
    'Ctrl' = 'Ctrl',
}

export const viewHotkeys: {
    current: Record<string, ViewHotkey>;
} = {
    current: {},
};

export const updateViewHotkeysDictionary = (hotkeys: ViewHotkey[]) => {
    viewHotkeys.current = {};
    for (const viewHotkey of hotkeys) {
        for (const hotkey of viewHotkey.hotkeys) {
            viewHotkeys.current[hotkeyToString(hotkey)] = {
                ...viewHotkey,
                hotkeys: viewHotkey.hotkeys,
            };
        }
    }
};
