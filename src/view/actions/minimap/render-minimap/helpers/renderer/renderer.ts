import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';
import { ShapesAndRanges } from 'src/view/actions/minimap/render-minimap/helpers/shapes/shapes-and-ranges';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';
import { CardRange } from 'src/view/actions/minimap/minimap-controller';
import { drawRectangle } from 'src/view/actions/minimap/render-minimap/helpers/renderer/helpers/draw-rectangle';
import { drawIndentationLines } from 'src/view/actions/minimap/render-minimap/helpers/renderer/helpers/draw-indentation-lines';
import { drawWordBlocks } from 'src/view/actions/minimap/render-minimap/helpers/renderer/helpers/draw-word-blocks';
import { CanvasWrapper } from 'src/view/actions/minimap/render-minimap/helpers/renderer/canvas-wrapper';

type State = {
    drawnAreas: {
        activeNode: CardRange | null;
        searchResults: CardRange[];
    };
};

export class Renderer extends CanvasWrapper {
    private shapes: ShapesAndRanges;

    private state: State = {
        drawnAreas: {
            activeNode: null,
            searchResults: [],
        },
    };

    constructor(
        ctx: OffscreenCanvasRenderingContext2D,
        canvas: OffscreenCanvas,
        shapes: ShapesAndRanges,
    ) {
        super(ctx, canvas);
        this.shapes = shapes;
    }

    private resetRange = (
        activeNodeId: string,
        cardRange: CardRange,
        theme: MinimapTheme,
    ) => {
        this.clearCanvasRange(cardRange);
        const wordBlocks = this.shapes
            .getWordBlocks()
            .filter((wb) => wb.cardId === cardRange.cardId);

        drawWordBlocks(this.ctx, wordBlocks, activeNodeId, theme);

        drawIndentationLines(
            this.ctx,
            this.shapes
                .getIndentationLines()
                .filter((line) => line.cardId === cardRange.cardId),
            theme,
        );
    };

    drawDocument = (activeNodeId: string, theme: MinimapTheme) => {
        const totalHeight = this.shapes.getTotalLines() * LINE_HEIGHT_CPX;
        this.canvas.height = totalHeight;
        this.clearCanvas();
        this.state.drawnAreas = {
            activeNode: null,
            searchResults: [],
        };

        drawWordBlocks(
            this.ctx,
            this.shapes.getWordBlocks(),
            activeNodeId,
            theme,
        );
        drawIndentationLines(
            this.ctx,
            this.shapes.getIndentationLines(),
            theme,
        );
    };

    drawIndicators = async (activeNodeId: string, theme: MinimapTheme) => {
        const cardRange = this.shapes.getCardRange(activeNodeId);
        if (!cardRange) {
            return;
        }

        if (this.state.drawnAreas.activeNode) {
            this.resetRange(
                activeNodeId,
                this.state.drawnAreas.activeNode,
                theme,
            );
        }

        for (const searchResult of this.state.drawnAreas.searchResults) {
            this.resetRange(activeNodeId, searchResult, theme);
        }

        drawRectangle(this.ctx, cardRange, theme.card_active);
        this.state.drawnAreas.activeNode = cardRange;

        const searchResultRanges = this.shapes.getSearchResultRanges();
        for (const searchResult of searchResultRanges) {
            drawRectangle(this.ctx, searchResult, theme.card_searchResult);
        }
        this.state.drawnAreas.searchResults = searchResultRanges;
    };
}
