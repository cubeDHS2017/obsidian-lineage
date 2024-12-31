import { LineageView } from 'src/view/view';
import { getIdOfSection } from 'src/stores/view/subscriptions/helpers/get-id-of-section';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import { Snapshot } from 'src/stores/document/document-state-type';

export const setActiveNode = (
    view: LineageView,
    action: DocumentStoreAction,
) => {
    const documentState = view.documentStore.getValue();
    const viewState = view.viewStore.getValue();

    const activeNodeOfView = viewState.document.activeNode;
    const activeSectionOfView =
        documentState.sections.id_section[activeNodeOfView];
    const activeNodeExists = !!activeSectionOfView;

    let newActiveSection = documentState.history.context.activeSection;
    let shouldSetActiveNode = true;

    if (activeNodeExists) {
        // keep the affected active section when undoing
        if (action.type === 'HISTORY/APPLY_PREVIOUS_SNAPSHOT') {
            const state = documentState.history.state;
            const previousSnapshot: Snapshot =
                documentState.history.items[state.activeIndex + 1];
            newActiveSection = previousSnapshot.context.affectedSection;
        }
        // active view of file should always update except for dnd events
        else if (view.isViewOfFile && action.type === 'DOCUMENT/DROP_NODE') {
            shouldSetActiveNode = false;
        }
        // unless the active node does not exist, don't update other views
        else if (!view.isActive) {
            shouldSetActiveNode = false;
        }
    }

    if (shouldSetActiveNode) {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id: getIdOfSection(documentState.sections, newActiveSection),
            },
        });
    }
};
