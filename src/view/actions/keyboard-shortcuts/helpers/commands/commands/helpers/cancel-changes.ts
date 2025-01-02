import { LineageView } from 'src/view/view';

export const cancelChanges = (view: LineageView) => {
    const documentViewState = view.viewStore.getValue().document;
    if (documentViewState.pendingConfirmation.disableEdit) {
        view.inlineEditor.unloadNode();
        if (documentViewState.editing.isInSidebar) {
            view.viewStore.dispatch({
                type: 'view/sidebar/disable-edit',
            });
        } else {
            view.viewStore.dispatch({
                type: 'view/main/disable-edit',
            });
        }
    } else {
        view.inlineEditor.onNextChange(() => {
            view.viewStore.dispatch({
                type: 'view/confirmation/reset/disable-edit',
            });
        });
        view.viewStore.dispatch({
            type: 'view/confirmation/confirm/disable-edit',
            payload: {
                id: documentViewState.editing.activeNodeId,
            },
        });
    }
};
