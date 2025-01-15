import { hotkeyToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/hotkey-to-string';
import {
    StatefulViewCommand,
    ViewHotkey,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
import invariant from 'tiny-invariant';

export enum Modifiers {
    'Alt' = 'Alt',
    'Mod' = 'Mod',
    'Shift' = 'Shift',
    'Ctrl' = 'Ctrl',
}

export const viewHotkeys: {
    current: Record<
        string,
        Omit<StatefulViewCommand, 'hotkeys'> & Pick<ViewHotkey, 'editorState'>
    >;
} = {
    current: {},
};

export const updateViewHotkeysDictionary = (hotkeys: StatefulViewCommand[]) => {
    viewHotkeys.current = {};
    for (const viewHotkey of hotkeys) {
        for (const hotkey of viewHotkey.hotkeys) {
            invariant(hotkey.editorState);
            viewHotkeys.current[hotkeyToString(hotkey)] = {
                ...viewHotkey,
                editorState: hotkey.editorState,
            };
        }
    }
};
