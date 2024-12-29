import { debounce } from 'src/helpers/debounce';
import { LineageView } from 'src/view/view';
import { drawMinimapWorker } from 'src/workers/worker-instances';
import invariant from 'tiny-invariant';

export const drawDocument = async (view: LineageView) => {
    const minimapStore = view.getMinimapStore();
    const state = minimapStore.getValue();
    const lineageDocument = view.documentStore.getValue().document;
    const canvasId = state.canvasId;
    const activeCardId = state.activeCardId;

    const payload = await drawMinimapWorker.run({
        type: 'minimap/set/document',
        payload: {
            document: lineageDocument,
            canvasId: canvasId,
            activeNodeId: activeCardId,
        },
    });
    invariant(payload);

    minimapStore.dispatch({
        type: 'minimap/set-card-ranges',
        payload: {
            ranges: payload.cardRanges,
            height_cpx: payload.totalDrawnHeight_cpx,
        },
    });
};
export const debouncedDrawDocument = debounce(drawDocument, 100);
