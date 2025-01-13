import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { LineageView } from 'src/view/view';
import { get } from 'svelte/store';
import { contentStore } from 'src/stores/document/derived/content-store';

export const skipAlign = (view: LineageView, action?: PluginAction) => {
    if (
        action &&
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar
    )
        return true;

    const viewState = view.viewStore.getValue();
    const activeNode = viewState.document.activeNode;
    if (viewState.outline.hiddenNodes.has(activeNode)) return true;

    if (action && action.type === 'view/align-branch/reveal-node') {
        const content = get(contentStore(view, activeNode));
        if (content.length === 0) return true;
    }
};
