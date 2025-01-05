import { SettingsStore } from 'src/main';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/css-variables/helpers/get-default-theme';
import { lang } from 'src/lang/lang';
import { ColorSetting } from 'src/view/actions/settings/components/shared/color-setting';

export const ActiveBranchColor = (
    container: HTMLElement,
    settingsStore: SettingsStore,
) => {
    ColorSetting(container, settingsStore, {
        defaultValue: getDefaultTheme().activeBranchColor,
        label: lang.settings_theme_active_branch_color,
        valueSelector: (settings) => settings.view.theme.activeBranchColor,
        onChange: (color) => {
            settingsStore.dispatch({
                type: 'settings/view/theme/set-active-branch-color',
                payload: {
                    color,
                },
            });
        },
    });
};
