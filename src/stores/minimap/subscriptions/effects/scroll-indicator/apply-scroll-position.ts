import {
    cpx_to_dpx,
    dpx_to_cpx,
} from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { debounce } from 'obsidian';
import {
    MinimapDomElements,
    ScrollInfo,
} from 'src/stores/minimap/minimap-state-type';

type ScrollDimensions = {
    indicatorHeight_dpx: number;
    indicatorPosition_dpx: number;
    scrollPosition_dpx: number;
};

type ContainerDimensions = {
    clientHeight_dpx: number;
    containerHeight_cpx: number;
};

const getContainerDimensions = (
    dom: MinimapDomElements,
): ContainerDimensions | null => {
    const minimapContainer = dom.scrollIndicator.parentElement;
    if (!minimapContainer) return null;

    return {
        clientHeight_dpx: minimapContainer.clientHeight,
        containerHeight_cpx: dpx_to_cpx(minimapContainer.clientHeight),
    };
};

const calculateScrollDimensions = (
    state: ScrollInfo,
    clientHeight_dpx: number,
    containerHeight_cpx: number,
): ScrollDimensions => {
    const indicatorHeight_cpx =
        (containerHeight_cpx / state.totalDrawnHeight_cpx) *
        containerHeight_cpx;
    const maxScroll_cpx = state.totalDrawnHeight_cpx - containerHeight_cpx;
    const scrollPercent = state.scrollPosition_cpx / maxScroll_cpx;

    const indicatorHeight_dpx = cpx_to_dpx(indicatorHeight_cpx);
    const indicatorPosition_dpx =
        scrollPercent * (clientHeight_dpx - indicatorHeight_dpx);
    const scrollPosition_dpx = cpx_to_dpx(state.scrollPosition_cpx);

    return {
        indicatorHeight_dpx,
        indicatorPosition_dpx,
        scrollPosition_dpx,
    };
};

const applyDomUpdates = (
    dom: MinimapDomElements,
    dimensions: ScrollDimensions,
): void => {
    requestAnimationFrame(() => {
        dom.scrollIndicator.style.height = `${dimensions.indicatorHeight_dpx}px`;
        dom.scrollIndicator.style.transform = `translateY(${dimensions.indicatorPosition_dpx}px)`;
        dom.canvasContainer.style.transform = `translateY(${-dimensions.scrollPosition_dpx}px)`;
    });
};

const applyScrollPosition = (
    state: ScrollInfo,
    dom: MinimapDomElements,
): void => {
    const dimensions = getContainerDimensions(dom);
    if (!dimensions) return;

    const isScrollIndicatorHidden =
        state.totalDrawnHeight_cpx <= dimensions.containerHeight_cpx;

    if (isScrollIndicatorHidden) {
        dom.scrollIndicator.style.display = 'none';
        dom.canvasContainer.style.transform = 'translateY(0)';
        return;
    }

    dom.scrollIndicator.style.display = 'block';

    const scrollDimensions = calculateScrollDimensions(
        state,
        dimensions.clientHeight_dpx,
        dimensions.containerHeight_cpx,
    );

    applyDomUpdates(dom, scrollDimensions);
};

export const debouncedApplyScrollPosition = debounce(applyScrollPosition, 16);
