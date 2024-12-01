import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_CARDS_GAP } from 'src/stores/settings/default-settings';

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
        .setName('Gap between cards')
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(DEFAULT_CARDS_GAP, 500, 5);
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
                .setTooltip('Reset');
        });
};
