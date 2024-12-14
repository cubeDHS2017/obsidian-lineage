import { LineageView } from 'src/view/view';

export const unloadInlineEditor = (view: LineageView) => {
    view.inlineEditor.unloadNode();
};

export const cancelChanges = (view: LineageView) => {
    const editingState = view.viewStore.getValue().document.editing;
    if (editingState.disableEditConfirmation) {
        unloadInlineEditor(view);
        if (editingState.isInSidebar) {
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
                type: 'DOCUMENT/RESET_DISABLE_EDIT_CONFIRMATION',
            });
        });
        view.viewStore.dispatch({
            type: 'DOCUMENT/CONFIRM_DISABLE_EDIT',
        });
    }
};
