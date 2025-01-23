import { MinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import { ShapesAndRanges } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/shapes-and-ranges';
import { drawLines } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/helpers/draw-lines';
import { VisibleRange } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/visible-range-manager';

export class Renderer {
    private shapes: ShapesAndRanges;

    protected ctx: OffscreenCanvasRenderingContext2D;
    protected canvas: OffscreenCanvas;

    constructor(
        ctx: OffscreenCanvasRenderingContext2D,
        canvas: OffscreenCanvas,
        shapes: ShapesAndRanges,
    ) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.shapes = shapes;
    }

    drawDocument = (theme: MinimapTheme, range: VisibleRange) => {
        this.canvas.height = range.end_cpx - range.start_cpx;

        drawLines(this.ctx, this.shapes.getLines(), theme, range);
    };
}
