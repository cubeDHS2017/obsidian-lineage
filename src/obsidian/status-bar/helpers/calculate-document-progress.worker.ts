import { calculateDocumentProgress } from 'src/obsidian/status-bar/helpers/calculate-document-prorgess';

self.onmessage = (event: MessageEvent) => {
    const result = calculateDocumentProgress(event.data.payload);
    self.postMessage({
        id: event.data.id,
        payload: result,
    });
};
