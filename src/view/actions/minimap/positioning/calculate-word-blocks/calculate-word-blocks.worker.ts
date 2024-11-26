import { calculateWordBlocks } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';

self.onmessage = (event: MessageEvent) => {
    const nodes = event.data.payload;
    const result = calculateWordBlocks(nodes);
    self.postMessage({
        id: event.data.id,
        payload: result,
    });
};
