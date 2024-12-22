import { CardRange } from 'src/view/actions/minimap/minimap-controller';
import { clearCanvas } from 'src/view/actions/minimap/render-minimap/helpers/renderer/helpers/clear-canvas';
import { clearCanvasRange } from 'src/view/actions/minimap/render-minimap/helpers/renderer/helpers/clear-canvas-range';

export class CanvasWrapper {
    protected ctx: OffscreenCanvasRenderingContext2D;
    protected canvas: OffscreenCanvas;

    constructor(
        ctx: OffscreenCanvasRenderingContext2D,
        canvas: OffscreenCanvas,
    ) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    protected clearCanvas() {
        clearCanvas(this.ctx);
    }

    protected clearCanvasRange(range: CardRange) {
        clearCanvasRange(this.ctx, range);
    }
}
