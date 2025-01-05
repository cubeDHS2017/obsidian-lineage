import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_INDENTATION_WIDTH } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';

export const CardIndentationWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    let input: SliderComponent;

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.setValue(settingsState.view.nodeIndentationWidth);
    };
    new Setting(element)
        .setName(lang.settings_layout_indentation_width)
        .setDesc(lang.settings_layout_indentation_width_desc)
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(0, 500, 5);
            setValue();
            cb.onChange((width) => {
                settingsStore.dispatch({
                    type: 'settings/view/set-node-indentation-width',
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
                        type: 'settings/view/set-node-indentation-width',
                        payload: {
                            width: DEFAULT_INDENTATION_WIDTH,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
