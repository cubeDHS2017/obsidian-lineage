import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { CANVAS_WIDTH_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';

export const setMinimapDom = (view: LineageView) => {
    const minimapContainer = view.contentEl.querySelector(
        '.minimap-container',
    ) as HTMLElement | null;
    invariant(minimapContainer);
    const canvasContainer = minimapContainer.querySelector(
        '.canvas-container',
    ) as HTMLElement | null;
    invariant(canvasContainer);
    const scrollIndicator = minimapContainer.querySelector(
        '#scrollIndicator',
    ) as HTMLElement;
    const canvas = minimapContainer.querySelector('canvas');
    invariant(scrollIndicator);
    invariant(canvas);
    canvas.width = CANVAS_WIDTH_CPX;
    const offscreen = canvas.transferControlToOffscreen();
    const dom = {
        offscreen,
        canvas,
        scrollIndicator,
        canvasContainer: canvasContainer,
    };
    view.setMinimapDom(dom);
};
