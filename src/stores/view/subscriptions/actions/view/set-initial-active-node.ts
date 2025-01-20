import { LineageView } from 'src/view/view';
import { maybeGetIdOfSection } from 'src/stores/view/subscriptions/helpers/maybe-get-id-of-section';

export const setInitialActiveNode = (view: LineageView) => {
    let id: string | null = null;
    const viewStore = view.viewStore;
    const documentState = view.documentStore.getValue();
    const settings = view.plugin.settings.getValue();
    const path = view.file!.path;
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
        type: 'view/set-active-node/document',
        payload: {
            id,
        },
    });
};
