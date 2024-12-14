import { WorkerPromise } from 'src/helpers/worker-promise';
// @ts-ignore
import W from './calculate-document-progress.worker';
import { DocumentProgressProps } from 'src/obsidian/status-bar/helpers/calculate-document-prorgess';

export const calculateDocumentProgressW = new WorkerPromise<
    DocumentProgressProps,
    number
>(new W());
