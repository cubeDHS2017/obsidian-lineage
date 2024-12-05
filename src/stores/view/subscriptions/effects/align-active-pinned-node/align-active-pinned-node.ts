import { LineageView } from 'src/view/view';
import { THRESHOLD } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { calculateScrollTop } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/helpers/calculate-scroll-top';

export const alignActivePinnedNode = (view: LineageView) => {
    requestAnimationFrame(() => {
        const documentState = view.documentStore.getValue();
        const viewState = view.viewStore.getValue();
        const activeNodeId =
            viewState.pinnedNodes.activeNode ||
            documentState.pinnedNodes.Ids[
                documentState.pinnedNodes.Ids.length - 1
            ];
        if (!activeNodeId) {
            return;
        }
        const container = view.contentEl.querySelector(
            '.pinned-cards-container',
        ) as HTMLElement | null;
        if (!container) return;
        const element = getNodeElement(container, activeNodeId);
        if (!element) return;

        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollTop = calculateScrollTop(elementRect, containerRect);
        if (Math.abs(scrollTop) > THRESHOLD)
            container.scrollBy({
                top: scrollTop * -1,
                behavior: 'smooth',
            });
    });
};
