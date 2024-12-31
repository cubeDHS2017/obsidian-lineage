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

    const state = {
        shift: false,
    };
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
        if (event.shiftKey !== state.shift) {
            state.shift = event.shiftKey;
            view.viewStore.dispatch({
                type: event.shiftKey
                    ? 'view/keyboard/shift/down'
                    : 'view/keyboard/shift/up',
            });
        }
    };

    const onKeyup = (event: KeyboardEvent) => {
        if (event.shiftKey !== state.shift) {
            state.shift = event.shiftKey;
            view.viewStore.dispatch({
                type: event.shiftKey
                    ? 'view/keyboard/shift/down'
                    : 'view/keyboard/shift/up',
            });
        }
    };
    target.addEventListener('keydown', keyboardEventHandler);
    target.addEventListener('keyup', onKeyup);

    return {
        destroy: () => {
            unsubscribeFromHotkeyStore();
            target.removeEventListener('keydown', keyboardEventHandler);
            target.removeEventListener('keyup', onKeyup);
        },
    };
};
