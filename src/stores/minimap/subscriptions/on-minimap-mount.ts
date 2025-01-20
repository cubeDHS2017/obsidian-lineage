import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { refreshMinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import { drawDocument } from 'src/stores/minimap/subscriptions/effects/draw-document';
import { setMinimapDom } from 'src/stores/minimap/subscriptions/effects/set-minimap-dom';
import { initializeMinimapWorker } from 'src/stores/minimap/subscriptions/effects/initialize-minimap-worker';
import { setMinimapActiveNode } from 'src/stores/minimap/subscriptions/actions/set-minimap-active-node';
import { debouncedApplyScrollPosition } from 'src/stores/minimap/subscriptions/effects/scroll-indicator/apply-scroll-position';

export const onMinimapMount = async (view: LineageView) => {
    const minimapStore = view.minimapStore;
    invariant(minimapStore);
    refreshMinimapTheme();
    setMinimapDom(view);
    initializeMinimapWorker(view);
    setMinimapActiveNode(view);
    await drawDocument(view);
    debouncedApplyScrollPosition(
        minimapStore.getValue().scrollInfo,
        view.getMinimapDom(),
    );
};
