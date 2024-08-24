import { LineageView } from 'src/view/view';
import { eventToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/event-to-string';
import { hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import {
    commandsDictionary,
    updateCommandsDictionary,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-commands-dictionary';
import { handleEscapeKey } from 'src/view/actions/on-escape/helpers/handle-escape-key';
import { onPluginError } from 'src/lib/store/on-plugin-error';

export const keyboardShortcuts = (
    target: HTMLElement,
    {
        view,
    }: {
        view: LineageView;
    },
) => {
    const event = 'keydown';

    const unsubscribeFromHotkeyStore = hotkeyStore.subscribe(
        (state, action, initialRun) => {
            if (
                action?.type === 'HOTKEY/UPDATE' ||
                action?.type === 'HOTKEY/RESET' ||
                initialRun
            )
                updateCommandsDictionary(state.hotkeys);
        },
    );
    const keyboardEventHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            const contain = handleEscapeKey(view);
            if (contain) return;
        }
        if ((event.target as HTMLElement).localName === 'input') return;
        const command = commandsDictionary.current[eventToString(event)];
        if (command) {
            if (command.check(view)) {
                try {
                    command.callback(view, event);
                } catch (error) {
                    onPluginError(error, 'command', command);
                }
            }
        }
    };

    target.addEventListener(event, keyboardEventHandler);

    return {
        destroy: () => {
            unsubscribeFromHotkeyStore();
            target.removeEventListener(event, keyboardEventHandler);
        },
    };
};
