import { LineageDocument } from 'src/stores/document/document-state-type';
import { ShapesAndRanges } from 'src/view/actions/minimap/render-minimap/helpers/shapes/shapes-and-ranges';
import { Renderer } from 'src/view/actions/minimap/render-minimap/helpers/renderer/renderer';
import {
    MinimapTheme,
    minimapTheme,
} from 'src/view/actions/minimap/minimap-theme';

export class MinimapRenderer {
    private renderer: Renderer;
    private shapes: ShapesAndRanges;

    private state: {
        theme: MinimapTheme;
    } = {
        theme: minimapTheme.current,
    };

    constructor(
        ctx: OffscreenCanvasRenderingContext2D,
        canvas: OffscreenCanvas,
        theme: MinimapTheme,
    ) {
        this.shapes = new ShapesAndRanges();
        this.renderer = new Renderer(ctx, canvas, this.shapes);
        this.state.theme = theme;
    }

    setTheme = (theme: MinimapTheme) => {
        this.state.theme = theme;
    };

    setDocument = (
        document: LineageDocument,
        activeNodeId: string,
        canvasId: string,
    ) => {
        const shapes = this.shapes.calculateDocument(document, canvasId);
        this.renderer.drawDocument(activeNodeId, this.state.theme);
        return {
            totalDrawnHeight_cpx: shapes.totalDrawnHeight_cpx,
            cardRanges: shapes.cardRanges,
        };
    };
}
