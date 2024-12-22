import { CardRange } from 'src/view/actions/minimap/minimap-controller';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

export const clearCanvasRange = (
    ctx: OffscreenCanvasRenderingContext2D,
    range: CardRange,
) => {
    ctx.clearRect(
        0,
        range.y_start - LINE_HEIGHT_CPX,
        ctx.canvas.width,
        LINE_HEIGHT_CPX * 2 + (range.y_end - range.y_start),
    );
};
