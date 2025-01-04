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
    payload: UpdateHotkeyAction['payload'],
) => {
    const commandToUpdate = state.hotkeys.find(
        (hotkey) => hotkey.name === payload.command,
    );
    if (!commandToUpdate) return;

    let existingCustomHotkey = state.customHotkeys[payload.command];
    if (!existingCustomHotkey) {
        existingCustomHotkey = {};
        state.customHotkeys[payload.command] = existingCustomHotkey;
    }
    const newHotkey = {
        modifiers: payload.hotkey.modifiers,
        key: payload.hotkey.key,
        string_representation: hotkeyToString(payload.hotkey),
        isCustom: true,
    } satisfies ExtendedHotkey;
    const hotkeyPosition = payload.primary ? 0 : 1;
    commandToUpdate.hotkeys[hotkeyPosition] = newHotkey;
    if (payload.primary) {
        existingCustomHotkey.primary = payload.hotkey;
    } else {
        existingCustomHotkey.secondary = payload.hotkey;
    }
};
