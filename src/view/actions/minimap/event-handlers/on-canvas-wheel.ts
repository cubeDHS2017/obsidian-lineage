import { dpx_to_cpx } from 'src/view/actions/minimap/event-handlers/on-canvas-click';
import { LineageView } from 'src/view/view';

export const onCanvasWheel = (e: WheelEvent, view: LineageView) => {
    e.preventDefault();

    const minimapStore = view.minimapController;
    const state = minimapStore.getScrollInfo();
    const dom = minimapStore.getDom();
    // @ts-ignore
    const minimapContainer = dom.canvas.parentElement.parentElement;
    if (!minimapContainer) return;

    const scrollAmount_cpx = dpx_to_cpx(e.deltaY);

    const containerHeight_cpx = dpx_to_cpx(minimapContainer.clientHeight);

    minimapStore.setScrollPosition(
        Math.max(
            0,
            Math.min(
                state.totalDrawnHeight_cpx - containerHeight_cpx,
                state.scrollPosition_cpx + scrollAmount_cpx,
            ),
        ),
    );
};
