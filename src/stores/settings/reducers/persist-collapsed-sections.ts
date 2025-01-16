import { Settings } from 'src/stores/settings/settings-type';
import { PersistCollapsedSectionsAction } from 'src/stores/settings/settings-reducer';

export const persistCollapsedSections = (
    state: Settings,
    action: PersistCollapsedSectionsAction,
) => {
    const documentPreferences = state.documents[action.payload.path];
    if (!documentPreferences) return;

    if (!documentPreferences.outline) {
        documentPreferences.outline = {
            collapsedSections: action.payload.sections,
        };
    } else {
        documentPreferences.outline.collapsedSections = action.payload.sections;
    }
};
