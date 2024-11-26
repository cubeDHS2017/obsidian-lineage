import { calculateIndentationLines } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';

self.onmessage = (event: MessageEvent) => {
    const wordBlocks = event.data.payload;
    const result = calculateIndentationLines(wordBlocks);
    self.postMessage({
        id: event.data.id,
        payload: result,
    });
};
