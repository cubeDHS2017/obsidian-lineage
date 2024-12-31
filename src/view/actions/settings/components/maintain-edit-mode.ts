import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';

export const MaintainEditMode = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    new Setting(element)
        .setName('Maintain edit mode')
        .setDesc(
            'Keeps edit mode active when switching to a different card with the mouse.',
        )
        .addToggle((cb) => {
            cb.setValue(settingsState.view.maintainEditMode).onChange(
                (maintain) => {
                    settingsStore.dispatch({
                        type: 'settings/view/set-maintain-edit-mode',
                        payload: {
                            maintain,
                        },
                    });
                },
            );
        });
};
