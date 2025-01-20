import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';

export const onCanvasWheel = (e: WheelEvent, view: LineageView) => {
    e.preventDefault();

    const minimapStore = view.getMinimapStore();
    const state = minimapStore.getValue().scrollInfo;
    const dom = view.getMinimapDom();
    // @ts-ignore
    const minimapContainer = dom.canvasContainer.parentElement;
    invariant(minimapContainer);

    const scrollAmount_cpx = dpx_to_cpx(e.deltaY);

    const containerHeight_cpx = dpx_to_cpx(minimapContainer.clientHeight);

    minimapStore.dispatch({
        type: 'minimap/set-scroll-position',
        payload: {
            position_cpx: Math.max(
                0,
                Math.min(
                    state.totalDrawnHeight_cpx - containerHeight_cpx,
                    state.scrollPosition_cpx + scrollAmount_cpx,
                ),
            ),
        },
    });
};
