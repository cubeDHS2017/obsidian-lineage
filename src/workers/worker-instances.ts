import type { CanvasWorkerProps } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/minimap-renderer.worker';
// @ts-ignore
import DrawMinimapWorker from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/minimap-renderer.worker';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';
import type { RulesWorkerEvent } from 'src/stores/view/subscriptions/effects/style-rules/workers/style-rules.worker';
// @ts-ignore
import RulesWorker from 'src/stores/view/subscriptions/effects/style-rules/workers/style-rules.worker';
import { StyleRulesResult } from 'src/stores/view/subscriptions/effects/style-rules/helpers/process-style-rules';
import { WorkerPromise } from 'src/helpers/worker-promise';
// @ts-ignore
import W from 'src/obsidian/status-bar/helpers/calculate-document-progress.worker';
import { DocumentProgressProps } from 'src/obsidian/status-bar/helpers/calculate-document-prorgess';

export const drawMinimapWorker = new WorkerPromise<
    CanvasWorkerProps,
    null | {
        totalDrawnHeight_cpx: number;
        cardRanges: CardRanges;
    },
    OffscreenCanvas
>(new DrawMinimapWorker());

export const rulesWorker = new WorkerPromise<
    RulesWorkerEvent,
    null | StyleRulesResult
>(new RulesWorker());

export const calculateDocumentProgressW = new WorkerPromise<
    DocumentProgressProps,
    number
>(new W());
