import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { lang } from 'src/lang/lang';

export const FontSize = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    let input: SliderComponent;

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.setValue(settingsState.view.fontSize);
    };
    new Setting(element)
        .setName(lang.settings_appearance_font_size)
        .addSlider((cb) => {
            input = cb;
            setValue();
            cb.onChange((fontSize) => {
                settingsStore.dispatch({
                    type: 'SET_FONT_SIZE',
                    payload: {
                        fontSize,
                    },
                });
            });
            cb.setLimits(8, 36, 1).setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_FONT_SIZE',
                        payload: {
                            fontSize: 16,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
