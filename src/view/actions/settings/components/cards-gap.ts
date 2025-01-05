import { SettingsStore } from 'src/main';
import { DEFAULT_CARDS_GAP } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';
import { RangeSetting } from 'src/view/actions/settings/components/shared/range-setting';

export const CardsGap = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    RangeSetting(element, settingsStore, {
        defaultValue: DEFAULT_CARDS_GAP,
        onChange: (value) => {
            settingsStore.dispatch({
                type: 'SET_CARDS_GAP',
                payload: {
                    gap: value,
                },
            });
        },
        valueSelector: (settingsState) => settingsState.view.cardsGap,
        label: lang.settings_layout_space_between_cards,
        desc: lang.settings_layout_space_between_cards_desc,
        max: 500,
        min: 0,
        step: 10,
    });
};
