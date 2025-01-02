import { ExtendedHotkey, HotkeyState } from 'src/stores/hotkeys/hotkey-store';
import { hotkeyToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/hotkey-to-string';
import { Hotkey } from 'obsidian';
import { CommandName } from 'src/lang/hotkey-groups';

export type UpdateHotkeyAction = {
    type: 'HOTKEY/UPDATE';
    payload: {
        hotkey: Hotkey;
        command: CommandName;
        primary: boolean;
    };
};
export const updateHotkey = (
    state: HotkeyState,
    action: UpdateHotkeyAction,
) => {
    const commandToUpdate = state.hotkeys.find(
        (hotkey) => hotkey.name === action.payload.command,
    );
    if (!commandToUpdate) return;

    let existingCustomHotkey = state.customHotkeys[action.payload.command];
    if (!existingCustomHotkey) {
        existingCustomHotkey = {};
        state.customHotkeys[action.payload.command] = existingCustomHotkey;
    }
    const newHotkey = {
        modifiers: action.payload.hotkey.modifiers,
        key: action.payload.hotkey.key,
        string_representation: hotkeyToString(action.payload.hotkey),
        isCustom: true,
    } satisfies ExtendedHotkey;
    const hotkeyPosition = action.payload.primary ? 0 : 1;
    commandToUpdate.hotkeys[hotkeyPosition] = newHotkey;
    if (action.payload.primary) {
        existingCustomHotkey.primary = action.payload.hotkey;
    } else {
        existingCustomHotkey.secondary = action.payload.hotkey;
    }
};
