import type { CanvasWorkerProps } from 'src/view/actions/minimap/render-minimap/minimap-renderer.worker';
// @ts-ignore
import DrawMinimapWorker from 'src/view/actions/minimap/render-minimap/minimap-renderer.worker';
import type { CardRanges } from 'src/view/actions/minimap/minimap-controller';
import { WorkerPromise } from 'src/helpers/worker-promise';

export const drawMinimapWorker = new WorkerPromise<
    CanvasWorkerProps,
    null | {
        totalDrawnHeight_cpx: number;
        cardRanges: CardRanges;
    },
    OffscreenCanvas
>(new DrawMinimapWorker());
