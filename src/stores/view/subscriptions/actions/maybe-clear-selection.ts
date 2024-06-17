import { LineageView } from 'src/view/view';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import { clearSelectedNodes } from 'src/stores/view/subscriptions/actions/clear-selected-nodes';

export const maybeClearSelection = (
    view: LineageView,
    action: ViewStoreAction,
) => {
    const selectedNodes = view.viewStore.getValue().document.selectedNodes;

    if (selectedNodes.size > 1) {
        const selectedNodeIsWithinSelection =
            action.type === 'DOCUMENT/SET_ACTIVE_NODE' &&
            selectedNodes.has(action.payload.id);
        if (!selectedNodeIsWithinSelection) {
            clearSelectedNodes(view);
        }
    }
};
