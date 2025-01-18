import { CommandName } from 'src/lang/hotkey-groups';
import { hotkeysLang } from 'src/lang/hotkeys-lang';
import { lang } from 'src/lang/lang';

export type DynamicLabelState = { outlineMode: boolean };

export const getDynamicLabel = (
    state: DynamicLabelState,
    name: CommandName,
): string => {
    if (state.outlineMode) {
        if (name === 'go_down') {
            return hotkeysLang['navigate_to_previous_node'];
        } else if (name === 'go_up') {
            return hotkeysLang['navigate_to_next_node'];
        } else if (name === 'go_left') {
            return lang.hk_select_previous_sibling;
        } else if (name === 'go_right') {
            return lang.hk_select_next_sibling;
        }
    }

    return hotkeysLang[name];
};
