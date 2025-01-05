import {
    calculateDocumentProgress,
    DocumentProgressProps,
} from 'src/obsidian/status-bar/helpers/calculate-document-prorgess';
import { getTotalChildrenCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-total-children-count';

export type WorkerEvent = {
    type: 'status-bar/calculate-document-progress';
    payload: DocumentProgressProps;
};
export type StatusBarWorkerResult = {
    totalChildCount: number;
    progress: number;
};

self.onmessage = (event: MessageEvent) => {
    const payload = event.data.payload as DocumentProgressProps;
    const progress = calculateDocumentProgress(payload);
    const totalChildCount = getTotalChildrenCount(
        payload.document.columns,
        payload.activeNode,
    );

    const result: StatusBarWorkerResult = {
        totalChildCount,
        progress,
    };
    self.postMessage({
        id: event.data.id,
        payload: result,
    });
};
