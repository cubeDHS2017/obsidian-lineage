import { MinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import { ShapesAndRanges } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/shapes-and-ranges';
import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { drawLines } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/helpers/draw-lines';
import { MinimapLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { resizeOffscreenCanvas } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/helpers/resize-offscreen-canvas';
import invariant from 'tiny-invariant';

type State = {
    drawnLines: Map<number, MinimapLine>;
};

export class Renderer {
    private shapes: ShapesAndRanges;
    private tempCtx: OffscreenCanvasRenderingContext2D;
    private state: State = {
        drawnLines: new Map<number, MinimapLine>(),
    };

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

        if (!this.tempCtx) {
            const tempCanvas = new OffscreenCanvas(
                this.ctx.canvas.width,
                this.ctx.canvas.height,
            );
            const context = tempCanvas.getContext('2d');
            invariant(context);
            this.tempCtx = context;
        }
        if (this.canvas.height !== totalHeight) {
            resizeOffscreenCanvas(this.ctx, this.tempCtx, totalHeight);
        }
        drawLines(
            this.ctx,
            this.shapes.getLines(),
            this.state.drawnLines,
            theme,
        );
    };
}
