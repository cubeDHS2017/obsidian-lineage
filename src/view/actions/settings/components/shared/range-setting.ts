import { SettingsStore } from 'src/main';
import { Setting, SliderComponent } from 'obsidian';
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

    const setValue = () => {
        const settingsState = settingsStore.getValue();
        input.setValue(props.valueSelector(settingsState));
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
            setValue();
            cb.onChange((value) => {
                props.onChange(value);
            }).setDynamicTooltip();
        })
        .addExtraButton((cb) => {
            cb.setIcon('reset')
                .onClick(() => {
                    props.onChange(props.defaultValue);
                    setValue();
                })
                .setTooltip(lang.settings_reset);
        });
};
