import { ViewStore } from 'src/view/view';
import { DocumentState } from 'src/stores/document/document-state-type';
import { getIdOfSection } from 'src/stores/view/subscriptions/helpers/get-id-of-section';

export const setActiveNode = (
    viewStore: ViewStore,
    documentState: DocumentState,
) => {
    viewStore.dispatch({
        type: 'DOCUMENT/SET_ACTIVE_NODE',
        payload: {
            id: getIdOfSection(
                documentState.sections,
                documentState.history.context.activeSection,
            ),
        },
    });
};
