import type { CanvasWorkerProps } from 'src/view/actions/minimap/render-minimap/helpers/draw-minimap.worker';
// @ts-ignore
import DrawMinimapWorker from 'src/view/actions/minimap/render-minimap/helpers/draw-minimap.worker';
import type {
    WordBlock,
    WordBlocksResult,
} from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import type { IndentationLine } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import type { ExtendedTreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import type { DrawWordMinimapProps } from 'src/view/actions/minimap/render-minimap/helpers/draw-minimap';
import type { CardRanges } from 'src/view/actions/minimap/minimap';
import { WorkerPromise } from 'src/helpers/worker-promise';
// @ts-ignore
import WordBlockWorker from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks.worker';
// @ts-ignore
import LineIndentationWorker from 'src/view/actions/minimap/positioning/calculate-indentation-lines.worker';
// @ts-ignore
import CreateYRangeMap from 'src/view/actions/minimap/positioning/create-y-range-map.worker';

export const drawMinimapWorker = new WorkerPromise<
    DrawWordMinimapProps | CanvasWorkerProps,
    number,
    OffscreenCanvas
>(new DrawMinimapWorker());

export const wordBlockWorker = new WorkerPromise<
    ExtendedTreeNode[],
    WordBlocksResult
>(new WordBlockWorker());
export const lineIndentationWorker = new WorkerPromise<
    WordBlock[],
    IndentationLine[]
>(new LineIndentationWorker());

export const createYRangeMapWorker = new WorkerPromise<WordBlock[], CardRanges>(
    new CreateYRangeMap(),
);
