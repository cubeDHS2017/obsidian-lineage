import { SettingsStore } from 'src/main';
import { getDefaultTheme } from 'src/stores/view/subscriptions/effects/css-variables/helpers/get-default-theme';
import { lang } from 'src/lang/lang';
import { ColorSetting } from 'src/view/actions/settings/components/shared/color-setting';

export const ActiveBranchBackground = (
    container: HTMLElement,
    settingsStore: SettingsStore,
) => {
    ColorSetting(container, settingsStore, {
        defaultValue: getDefaultTheme().activeBranchBg,
        label: lang.settings_theme_active_branch_bg,
        valueSelector: (settings) => settings.view.theme.activeBranchBg,
        onChange: (color) => {
            settingsStore.dispatch({
                type: 'SET_ACTIVE_BRANCH_BG',
                payload: {
                    backgroundColor: color,
                },
            });
        },
    });
};
