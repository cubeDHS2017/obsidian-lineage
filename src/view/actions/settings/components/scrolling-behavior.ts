import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { lang } from 'src/lang/lang';

export const ScrollingBehavior = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    const setting = new Setting(element)
        .setName(lang.settings_scrolling_reveal_child)
        .setDesc(lang.settings_scrolling_reveal_child_desc);

    setting.addToggle((tg) => {
        tg.setValue(settingsState.view.scrolling.revealChildren).onChange(
            (v) => {
                settingsStore.dispatch({
                    type: 'VIEW/SCROLLING/SET_REVEAL_CHILDREN',
                    payload: {
                        reveal: v,
                    },
                });
            },
        );
    });
};
