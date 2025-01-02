import { hotkeysGroups, PluginCommand } from 'src/lang/hotkey-groups';
import { CommandHotkeys } from 'src/stores/hotkeys/hotkey-store';
import { hotkeyToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/hotkey-to-string';

export const commandToHotkeys = (command: PluginCommand): CommandHotkeys => {
    return {
        name: command.name,
        hotkeys: command.hotkeys.map((h) => ({
            string_representation: hotkeyToString(h),
            key: h.key,
            modifiers: [...h.modifiers],
        })),
        group: hotkeysGroups[command.name],
    };
};
