import { LineageView } from 'src/view/view';
import { eventToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/event-to-string';
import { viewHotkeys } from 'src/view/actions/keyboard-shortcuts/helpers/commands/update-view-hotkeys-dictionary';
import { handleEscapeKey } from 'src/view/actions/on-escape/helpers/handle-escape-key';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { isEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';

export const viewHotkeysAction = (
    target: HTMLElement,
    {
        view,
    }: {
        view: LineageView;
    },
) => {
    const state = {
        shift: false,
    };
    const keyboardEventHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            const contain = handleEscapeKey(view);
            if (contain) return;
        }
        if ((event.target as HTMLElement).localName === 'input') return;
        const command = viewHotkeys.current[eventToString(event)];
        if (command) {
            const allow =
                command.editorState === 'editor-on'
                    ? isEditing(view)
                    : command.editorState === 'editor-off'
                      ? !isEditing(view)
                      : true;

            if (allow) {
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
            target.removeEventListener('keydown', keyboardEventHandler);
            target.removeEventListener('keyup', onKeyup);
        },
    };
};
