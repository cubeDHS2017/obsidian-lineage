import type { CanvasWorkerProps } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/minimap-renderer.worker';
// @ts-ignore
import DrawMinimapWorker from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/minimap-renderer.worker';
import { WorkerPromise } from 'src/helpers/worker-promise';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export const drawMinimapWorker = new WorkerPromise<
    CanvasWorkerProps,
    null | {
        totalDrawnHeight_cpx: number;
        cardRanges: CardRanges;
    },
    OffscreenCanvas
>(new DrawMinimapWorker());
