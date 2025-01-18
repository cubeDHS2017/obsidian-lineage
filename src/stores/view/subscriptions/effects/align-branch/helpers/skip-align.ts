import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { LineageView } from 'src/view/view';

export const skipAlign = (view: LineageView, action: PluginAction) => {
    if (
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar
    )
        return true;

    if (action.type === 'view/set-active-node/mouse-silent') return true;

    const outlineMode = view.plugin.settings.getValue().view.outlineMode;
    if (outlineMode) {
        const viewState = view.viewStore.getValue();
        const activeNode = viewState.document.activeNode;
        if (viewState.outline.hiddenNodes.has(activeNode) && outlineMode)
            return true;
    }
};
