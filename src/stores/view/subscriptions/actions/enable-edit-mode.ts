import { ViewStore } from 'src/view/view';
import { DocumentState } from 'src/stores/document/document-state-type';
import { getIdOfSection } from 'src/stores/view/subscriptions/helpers/get-id-of-section';

export const enableEditMode = (
    viewStore: ViewStore,
    documentState: DocumentState,
) => {
    viewStore.dispatch({
        type: 'DOCUMENT/ENABLE_EDIT_MODE',
        payload: {
            nodeId: getIdOfSection(
                documentState.sections,
                documentState.history.context.activeSection,
            ),
        },
    });
};
