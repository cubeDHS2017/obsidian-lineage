import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_CARDS_GAP } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';

export const CardsGap = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let input: SliderComponent;

    const setValue = () => {
        input.setValue(settingsState.view.cardsGap);
    };
    new Setting(element)
        .setName(lang.settings_layout_space_between_cards)
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(0, 500, 10);
            cb.onChange((gap) => {
                settingsStore.dispatch({
                    type: 'SET_CARDS_GAP',
                    payload: {
                        gap,
                    },
                });
            }).setDynamicTooltip();
            setValue();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'SET_CARDS_GAP',
                        payload: {
                            gap: DEFAULT_CARDS_GAP,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
