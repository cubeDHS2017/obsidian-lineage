import { MinimapLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { MinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import {
    INDENT_BLOCK_WIDTH_CPX,
    LINE_GAP_CPX,
    LINE_HEIGHT_CPX,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { VisibleRange } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/visible-range-manager';

const BLOCK_HEIGHT_CPX = LINE_HEIGHT_CPX - LINE_GAP_CPX;

export const drawLines = (
    ctx: OffscreenCanvasRenderingContext2D,
    lines: MinimapLine[],
    theme: MinimapTheme,
    range: VisibleRange,
) => {
    let currentFillStyle = '',
        fillStyle = '';
    for (let i = 0; i <= lines.length - 1; i++) {
        const line = lines[i];
        let y_px = line.y_px;
        if (y_px < range.start_cpx) continue;
        if (y_px > range.end_cpx) break;

        if (range.start_cpx > 0) y_px = y_px - range.start_cpx;

        for (const word of line.wordBlocks) {
            if (word.empty) continue;

            fillStyle = word.chunkType
                ? theme.chars[word.chunkType]
                : theme.wordBlock;
            if (fillStyle !== currentFillStyle) {
                currentFillStyle = fillStyle;
                ctx.fillStyle = fillStyle;
            }
            ctx.fillRect(word.x_px, y_px, word.width_px, BLOCK_HEIGHT_CPX);
        }

        currentFillStyle = '';
        ctx.fillStyle = theme.indentLine;
        for (const indentationLine of line.indentationLines) {
            ctx.fillRect(
                indentationLine.x_px,
                y_px,
                INDENT_BLOCK_WIDTH_CPX,
                indentationLine.height_px,
            );
        }
    }
};
