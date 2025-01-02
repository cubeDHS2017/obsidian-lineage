import { LineageView } from 'src/view/view';

export const saveNodeContent = (view: LineageView) => {
    if (view.inlineEditor.nodeId) {
        view.inlineEditor.unloadNode();
        const isInSidebar =
            view.viewStore.getValue().document.editing.isInSidebar;
        if (isInSidebar) {
            view.viewStore.dispatch({
                type: 'view/sidebar/disable-edit',
            });
        } else {
            view.viewStore.dispatch({
                type: 'view/main/disable-edit',
            });
        }
    }
};
