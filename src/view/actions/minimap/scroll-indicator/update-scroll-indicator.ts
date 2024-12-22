import {
    MinimapDomElements,
    MinimapState,
} from 'src/view/actions/minimap/minimap-controller';
import {
    cpx_to_dpx,
    dpx_to_cpx,
} from 'src/view/actions/minimap/event-handlers/on-canvas-click';
import { debounce } from 'obsidian';

const updateScrollIndicator = (
    state: MinimapState,
    dom: MinimapDomElements,
): void => {
    const minimapContainer = dom.scrollIndicator.parentElement;
    if (!minimapContainer) return;

    const clientHeight_dpx = minimapContainer.clientHeight;
    const containerHeight_cpx = dpx_to_cpx(clientHeight_dpx);

    if (state.totalDrawnHeight_cpx <= containerHeight_cpx) {
        dom.scrollIndicator.style.display = 'none';
        dom.canvas.style.transform = 'translateY(0)';
        return;
    }

    dom.scrollIndicator.style.display = 'block';

    const indicatorHeight_cpx =
        (containerHeight_cpx / state.totalDrawnHeight_cpx) *
        containerHeight_cpx;
    const maxScroll_cpx = state.totalDrawnHeight_cpx - containerHeight_cpx;
    const scrollPercent = state.scrollPosition_cpx / maxScroll_cpx;
    const indicatorHeight_dpx = cpx_to_dpx(indicatorHeight_cpx);
    const indicatorPosition_dpx =
        scrollPercent * (clientHeight_dpx - indicatorHeight_dpx);

    dom.scrollIndicator.style.height = `${indicatorHeight_dpx}px`;
    dom.scrollIndicator.style.transform = `translateY(${indicatorPosition_dpx}px)`;
    const scrollPosition_dpx = cpx_to_dpx(state.scrollPosition_cpx);
    dom.canvas.style.transform = `translateY(${-scrollPosition_dpx}px)`;
};

export const debouncedUpdateScrollIndicator = debounce(
    updateScrollIndicator,
    16,
);
