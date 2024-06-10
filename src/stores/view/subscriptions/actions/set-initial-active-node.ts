import { ViewStore } from 'src/view/view';
import { DocumentState } from 'src/stores/document/document-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { maybeGetIdOfSection } from 'src/stores/view/subscriptions/helpers/maybe-get-id-of-section';

export const setInitialActiveNode = (
    viewStore: ViewStore,
    documentState: DocumentState,
    settings: Settings,
    path: string,
) => {
    let id: string | null = null;
    const persistedSection = settings.documents[path]?.activeSection;
    const sections = documentState.sections;
    if (persistedSection) {
        id = maybeGetIdOfSection(sections, persistedSection);
    }
    const mostRecentActiveSection = documentState.history.context.activeSection;
    if (!id && mostRecentActiveSection) {
        id = maybeGetIdOfSection(sections, mostRecentActiveSection);
    }
    if (!id) return;
    viewStore.dispatch({
        type: 'DOCUMENT/SET_ACTIVE_NODE',
        payload: {
            id,
        },
    });
};
