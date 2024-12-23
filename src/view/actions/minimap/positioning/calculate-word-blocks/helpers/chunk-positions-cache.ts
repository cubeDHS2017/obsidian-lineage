import { ChunkPositionResult } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-chunk-positions';

class ChunkPositionsCache {
    private caches: {
        [canvasId: string]: Map<
            string,
            {
                result: ChunkPositionResult;
                content: string;
                availableLineCharacters: number;
            }
        >;
    } = {};

    getCachedResult = (
        canvasId: string,
        nodeId: string,
        content: string,
        availableLineCharacters: number,
    ) => {
        const cache = this.caches[canvasId];
        if (!cache) return;
        const cached = cache.get(nodeId);
        if (cached) {
            const valid =
                cached.availableLineCharacters === availableLineCharacters &&
                cached.content === content;
            if (valid) {
                return cached.result;
            } else {
                cache.delete(nodeId);
            }
        }
    };

    cacheResult = (
        canvasId: string,
        nodeId: string,
        content: string,
        availableLineCharacters: number,
        result: ChunkPositionResult,
    ) => {
        if (!this.caches[canvasId]) {
            this.caches[canvasId] = new Map();
        }
        const cache = this.caches[canvasId];

        cache.set(nodeId, { availableLineCharacters, content, result });
    };

    deleteCanvasCache = (canvasId: string) => {
        delete this.caches[canvasId];
    };
}

export const chunkPositionsCache = new ChunkPositionsCache();
