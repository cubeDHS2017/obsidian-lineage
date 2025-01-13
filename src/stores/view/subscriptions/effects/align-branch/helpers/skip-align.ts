import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { LineageView } from 'src/view/view';

export const skipAlign = (view: LineageView, action?: PluginAction) => {
    if (
        action &&
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar
    )
        return true;

    const viewState = view.viewStore.getValue();
    if (viewState.outline.hiddenNodes.has(viewState.document.activeNode))
        return true;
};
