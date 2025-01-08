import { LineageView } from 'src/view/view';
import { minimapWorker } from 'src/workers/worker-instances';
import { minimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';

export const initializeMinimapWorker = async (view: LineageView) => {
    await minimapWorker.run(
        {
            type: 'worker/initialize',
            payload: {
                canvas: view.getMinimapDom().offscreen,
                canvasId: view.getMinimapStore().getValue().canvasId,
                theme: minimapTheme.current,
            },
        },
        view.getMinimapDom().offscreen,
    );
};
