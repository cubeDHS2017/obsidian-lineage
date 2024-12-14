import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';

export const DefaultDocumentFormat = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    const settingsState = settingsStore.getValue();
    const setting = new Setting(element).setName('Default format');
    setting.setDesc('Applies to new documents');
    setting.addDropdown((cb) => {
        const value = settingsState.general.defaultDocumentFormat;

        cb.addOptions({
            'html-element': 'HTML elements',
            sections: 'HTML comments',
            outline: 'Outline',
        } satisfies Record<LineageDocumentFormat, string>)
            .setValue(value)
            .onChange((value) => {
                settingsStore.dispatch({
                    type: 'GENERAL/SET_DEFAULT_DOCUMENT_FORMAT',
                    payload: {
                        format: value as LineageDocumentFormat,
                    },
                });
            });
    });
};
