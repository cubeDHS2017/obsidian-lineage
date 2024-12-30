import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_INDENTATION_WIDTH } from 'src/stores/settings/default-settings';

export const CardIndentationWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    let input: SliderComponent;

    const setValue = () => {
        input.setValue(settingsState.view.nodeIndentationWidth);
    };
    new Setting(element)
        .setName('Indentation width')
        .setDesc('Applicable in single column mode')
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(0, 500, 5);
            cb.onChange((width) => {
                settingsStore.dispatch({
                    type: 'settings/view/set-node-indentation-width',
                    payload: {
                        width,
                    },
                });
            }).setDynamicTooltip();
            setValue();
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
                .setTooltip('Reset');
        });
};
