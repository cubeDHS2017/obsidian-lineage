import { LineageView } from 'src/view/view';
import { onMinimapMount } from 'src/stores/minimap/subscriptions/on-minimap-mount';
import { onMinimapStateUpdate } from 'src/stores/minimap/subscriptions/on-minimap-state-update';
import { minimapWorker } from 'src/workers/worker-instances';

export const minimapSubscriptions = (view: LineageView) => {
    const unsub = view.minimapStore!.subscribe(
        (viewState, action, initialRun) => {
            if (initialRun) {
                onMinimapMount(view);
            } else if (action) {
                onMinimapStateUpdate(view, action, viewState);
            }
        },
    );

    return () => {
        unsub();
        minimapWorker.run({
            type: 'worker/destroy',
            payload: { canvasId: view.minimapStore!.getValue().canvasId },
        });
        view.minimapStore = null;
    };
};
