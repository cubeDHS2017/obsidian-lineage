import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_CARD_WIDTH } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';

export const CardWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    let input: SliderComponent;

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.setValue(settingsState.view.cardWidth);
    };
    new Setting(element)
        .setName(lang.settings_layout_card_width)
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(200, 1000, 10);
            setValue();
            cb.onChange((width) => {
                settingsStore.dispatch({
                    type: 'SET_CARD_WIDTH',
                    payload: {
                        width,
                    },
                });
            }).setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_CARD_WIDTH',
                        payload: {
                            width: DEFAULT_CARD_WIDTH,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
