import { MinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import { ShapesAndRanges } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/shapes-and-ranges';
import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { drawLines } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/helpers/draw-lines';

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

    drawDocument = (theme: MinimapTheme) => {
        const totalHeight = this.shapes.getTotalLines() * LINE_HEIGHT_CPX;

        this.canvas.height = totalHeight;

        drawLines(this.ctx, this.shapes.getLines(), theme);
    };
}
