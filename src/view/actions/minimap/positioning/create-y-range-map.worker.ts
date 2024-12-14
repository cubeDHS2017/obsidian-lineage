import { createYRangeMap } from 'src/view/actions/minimap/positioning/create-y-range-map';

self.onmessage = (event: MessageEvent) => {
    const wordBlocks = event.data.payload;
    const result = createYRangeMap(wordBlocks);
    self.postMessage({
        id: event.data.id,
        payload: result,
    });
};
