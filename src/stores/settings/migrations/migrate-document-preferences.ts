import { Settings, Settings_0_5_4 } from 'src/stores/settings/settings-type';

export const migrateDocumentPreferences = (
    settings: Settings | Settings_0_5_4,
) => {
    for (const [path, pref] of Object.entries(settings.documents)) {
        if (typeof pref === 'boolean') {
            settings.documents[path] = {
                documentFormat: 'document',
                viewType: 'lineage',
            };
        }
    }
};
