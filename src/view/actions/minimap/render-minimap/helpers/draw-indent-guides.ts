import { IndentationLine } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import { minimapColors } from 'src/view/actions/minimap/minimap-colors';

export const drawIndentGuides = (
    ctx: CanvasRenderingContext2D,
    lines: IndentationLine[],
): void => {
    for (const line of lines) {
        ctx.beginPath();
        ctx.fillStyle = minimapColors.current.indentLine;
        ctx.roundRect(line.x_px, line.y_px, line.width_px, line.height_px, 1);
        ctx.fill();
    }
};
