import { LineageView } from 'src/view/view';
import { minimapWorker } from 'src/workers/worker-instances';
import { cpx_to_dpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { debounce } from 'obsidian';

const updateVisibleRange = async (view: LineageView) => {
    const minimapStore = view.getMinimapStore();
    const state = minimapStore.getValue();
    const canvasId = state.canvasId;

    const payload = await minimapWorker.run({
        type: 'minimap/set/scroll-position',
        payload: {
            canvasId: canvasId,
            scroll_position_cpx: state.scrollInfo.scrollPosition_cpx,
        },
    });

    // payload is truthy only when the range is different
    if (payload && 'start_cpx' in payload) {
        const canvas = view.getMinimapDom().canvas;
        const marginTop = cpx_to_dpx(payload.start_cpx) + 'px';
        canvas.style.marginTop = marginTop;
    }
};

export const debouncedUpdateVisibleRange = debounce(updateVisibleRange, 16);
