import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const ScrollingBehavior = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    const setting = new Setting(element)
        .setName('Scroll to reveal child cards')
        .setDesc(
            "Applicable when scrolling mode is set to 'reveal active card'",
        );

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
