import { LineageView } from 'src/view/view';
import { getIdOfSection } from 'src/stores/view/subscriptions/helpers/get-id-of-section';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';

export const setActiveNode = (
    view: LineageView,
    action: DocumentStoreAction,
) => {
    const documentState = view.documentStore.getValue();
    let shouldSetActiveNode =
        (view.isViewOfFile && action.type !== 'DOCUMENT/DROP_NODE') ||
        action.type === 'DOCUMENT/LOAD_FILE';
    if (!shouldSetActiveNode) {
        const activeNodeOfView = view.viewStore.getValue().document.activeNode;
        const activeNodeDoesNotExist =
            !documentState.sections.id_section[activeNodeOfView];
        shouldSetActiveNode = activeNodeDoesNotExist;
    }
    if (shouldSetActiveNode) {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id: getIdOfSection(
                    documentState.sections,
                    documentState.history.context.activeSection,
                ),
            },
        });
    }
};
