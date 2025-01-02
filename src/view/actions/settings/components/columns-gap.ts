import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_COLUMNS_GAP } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';

export const ColumnsGap = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let input: SliderComponent;

    const setValue = () => {
        input.setValue(settingsState.view.columnsGap);
    };
    new Setting(element)
        .setName(lang.settings_layout_space_between_columns)
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(0, 500, 10);
            cb.onChange((gap) => {
                settingsStore.dispatch({
                    type: 'SET_COLUMNS_GAP',
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
                        type: 'SET_COLUMNS_GAP',
                        payload: {
                            gap: DEFAULT_COLUMNS_GAP,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
