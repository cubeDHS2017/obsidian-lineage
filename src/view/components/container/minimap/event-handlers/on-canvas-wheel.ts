import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { LineageView } from 'src/view/view';

export const refreshScrollPosition = (
    view: LineageView,
    delta_y_dpx: number,
) => {
    const minimapStore = view.getMinimapStore();
    const state = minimapStore.getValue().scrollInfo;

    const scrollAmount_cpx = dpx_to_cpx(delta_y_dpx);
    if (state.containerHeight_cpx === 0) return;
    let position_cpx: number;
    if (delta_y_dpx === 0) {
        position_cpx = Math.max(
            0,
            state.totalDrawnHeight_cpx - state.containerHeight_cpx,
        );
    } else {
        position_cpx = Math.max(
            0,
            Math.min(
                state.totalDrawnHeight_cpx - state.containerHeight_cpx,
                state.scrollPosition_cpx + scrollAmount_cpx,
            ),
        );
    }
    minimapStore.dispatch({
        type: 'minimap/set-scroll-position',
        payload: {
            position_cpx: position_cpx,
        },
    });
};

export const onCanvasWheel = (e: WheelEvent, view: LineageView) => {
    e.preventDefault();
    refreshScrollPosition(view, e.deltaY);
};
