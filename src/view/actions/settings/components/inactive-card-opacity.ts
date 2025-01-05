import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
import { DEFAULT_INACTIVE_NODE_OPACITY } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';

export const InactiveCardOpacity = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    let input: SliderComponent;

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.setValue(
            Math.round(settingsState.view.theme.inactiveNodeOpacity),
        );
    };
    new Setting(element)
        .setName(lang.settings_appearance_inactive_node_opacity)
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(0, 100, 5);
            setValue();
            cb.onChange((value) => {
                settingsStore.dispatch({
                    type: 'settings/view/theme/set-inactive-node-opacity',
                    payload: {
                        opacity: value,
                    },
                });
            }).setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    settingsStore.dispatch({
                        type: 'settings/view/theme/set-inactive-node-opacity',
                        payload: {
                            opacity: DEFAULT_INACTIVE_NODE_OPACITY,
                        },
                    });
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
