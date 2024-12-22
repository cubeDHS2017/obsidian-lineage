import { IndentationLine } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';

export const drawIndentationLines = (
    ctx: OffscreenCanvasRenderingContext2D,
    lines: IndentationLine[],
    theme: MinimapTheme,
) => {
    ctx.globalAlpha = 1;
    for (const line of lines) {
        ctx.beginPath();
        ctx.fillStyle = theme.indentLine;
        ctx.roundRect(line.x_px, line.y_px, line.width_px, line.height_px, 1);
        ctx.fill();
    }
};
