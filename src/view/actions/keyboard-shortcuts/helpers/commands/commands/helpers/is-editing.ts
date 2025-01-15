import { LineageView } from 'src/view/view';

export const isEditing = (view: LineageView) => {
    return !!view.viewStore.getValue().document.editing.activeNodeId;
};
export const isActive = (view: LineageView) => {
    return !!view.viewStore.getValue().document.activeNode;
};
export const isNotEditing = (view: LineageView) => {
    return !isEditing(view);
};
