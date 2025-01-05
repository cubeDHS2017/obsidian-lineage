import { SettingsStore } from 'src/main';
import { ColorComponent, Setting } from 'obsidian';
import { lang } from 'src/lang/lang';
import { Settings } from 'src/stores/settings/settings-type';

export type ColorInputProps = {
    label: string;
    onChange: (color: string | undefined) => void;
    valueSelector: (settings: Settings) => string | undefined;
    defaultValue: string;
};

export const ColorSetting = (
    container: HTMLElement,
    settingsStore: SettingsStore,
    props: ColorInputProps,
) => {
    let input: ColorComponent;

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.onChange(() => void undefined);
        input.setValue(
            props.valueSelector(settingsState) || props.defaultValue,
        );
        input.onChange(props.onChange);
    };
    new Setting(container)
        .setName(props.label)
        .addColorPicker((cb) => {
            input = cb;
            setValue();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    props.onChange(undefined);
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
