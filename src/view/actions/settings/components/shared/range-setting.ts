import { SettingsStore } from 'src/main';
import { ExtraButtonComponent, Setting, SliderComponent } from 'obsidian';
import { lang } from 'src/lang/lang';
import { Settings } from 'src/stores/settings/settings-type';

export type RangeInputProps = {
    label: string;
    desc?: string;
    onChange: (value: number) => void;
    valueSelector: (settings: Settings) => number;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
};

export const RangeSetting = (
    element: HTMLElement,
    settingsStore: SettingsStore,
    props: RangeInputProps,
) => {
    let input: SliderComponent;
    let resetButton: ExtraButtonComponent;

    const updateExtraButton = (currentValue: number) => {
        if (currentValue === props.defaultValue) {
            resetButton.setDisabled(true);
        } else {
            resetButton.setDisabled(false);
        }
    };
    const setValue = () => {
        const settingsState = settingsStore.getValue();
        const currentValue =
            props.valueSelector(settingsState) ?? props.defaultValue;
        input.setValue(currentValue);
        updateExtraButton(currentValue);
    };
    const setting = new Setting(element);
    setting.setName(props.label);
    if (props.desc) {
        setting.setDesc(props.desc);
    }

    setting
        .addSlider((cb) => {
            input = cb;
            cb.setLimits(props.min, props.max, props.step);

            cb.onChange((value) => {
                props.onChange(value);
                updateExtraButton(value);
            }).setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            resetButton = cb;
            cb.setIcon('reset')
                .onClick(() => {
                    props.onChange(props.defaultValue);
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
    setValue();
};
