import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';
import { CardRange } from 'src/view/actions/minimap/minimap-controller';

export const drawRectangle = (
    ctx: OffscreenCanvasRenderingContext2D,
    activeCardRange: CardRange,
    fillStyle: string,
) => {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(
        0,
        activeCardRange.y_start - LINE_HEIGHT_CPX,
        ctx.canvas.width,
        LINE_HEIGHT_CPX * 2 + (activeCardRange.y_end - activeCardRange.y_start),
    );
};
