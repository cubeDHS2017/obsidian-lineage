import { dpx_to_cpx } from '../event-handlers/on-canvas-click';
import { MinimapDomElements } from 'src/view/actions/minimap/minimap-controller';

export const calculateScrollDeltaToActiveCard = (
    y_start_cpx: number,
    y_end_cpx: number,
    totalDrawnHeight_cpx: number,
    scrollPosition_cpx: number,
    dom: MinimapDomElements,
) => {
    const minimapContainer = dom.scrollIndicator.parentElement;
    if (!minimapContainer) return null;

    const clientHeight_dpx = minimapContainer.clientHeight;
    const containerHeight_cpx = dpx_to_cpx(clientHeight_dpx);

    const contentFitsContainer = totalDrawnHeight_cpx <= containerHeight_cpx;
    if (contentFitsContainer) {
        dom.canvas.style.transform = 'translateY(0)';
        return null;
    }

    const currentScroll_cpx = scrollPosition_cpx;
    const visibleStart_cpx = currentScroll_cpx;
    const visibleEnd_cpx = currentScroll_cpx + containerHeight_cpx;

    const rangeIsVisible =
        y_start_cpx >= visibleStart_cpx && y_end_cpx <= visibleEnd_cpx;
    if (rangeIsVisible) {
        return null;
    }

    // calculate new scroll position
    let newScroll_cpx = 0;

    const range_height_cpx = y_end_cpx - y_start_cpx;
    const rangeIsTallerThanContaienr = range_height_cpx > containerHeight_cpx;
    if (rangeIsTallerThanContaienr) {
        //  scroll to start of range
        newScroll_cpx = y_start_cpx;
    } else {
        if (y_end_cpx > visibleEnd_cpx) {
            newScroll_cpx = y_end_cpx + 10;
        } else if (y_start_cpx < visibleStart_cpx) {
            newScroll_cpx = y_start_cpx - 10;
        }
    }

    const maxScroll_cpx = totalDrawnHeight_cpx - containerHeight_cpx;
    newScroll_cpx = Math.max(0, Math.min(newScroll_cpx, maxScroll_cpx));

    return newScroll_cpx;
};
