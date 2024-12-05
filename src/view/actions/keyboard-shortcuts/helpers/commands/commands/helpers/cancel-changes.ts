import { LineageView } from 'src/view/view';

export const unloadInlineEditor = (view: LineageView) => {
    view.inlineEditor.unloadNode();
};

export const cancelChanges = (view: LineageView) => {
    if (view.viewStore.getValue().document.editing.disableEditConfirmation) {
        unloadInlineEditor(view);
        view.viewStore.dispatch({
            type: 'DOCUMENT/DISABLE_EDIT_MODE',
        });
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
