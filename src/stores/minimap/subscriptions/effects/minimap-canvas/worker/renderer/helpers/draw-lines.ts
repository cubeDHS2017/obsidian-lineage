import { MinimapLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { MinimapTheme } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import {
    INDENT_BLOCK_WIDTH_CPX,
    LINE_GAP_CPX,
    LINE_HEIGHT_CPX,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { clearCanvasRange } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/helpers/clear-canvas-range';

const BLOCK_HEIGHT_CPX = LINE_HEIGHT_CPX - LINE_GAP_CPX;

export const drawLines = (
    ctx: OffscreenCanvasRenderingContext2D,
    lines: MinimapLine[],
    drawnLines: Map<number, MinimapLine>,
    theme: MinimapTheme,
) => {
    let firstModifiedLine: number | null = null;
    let lastModifiedLine: number | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const existingLine = drawnLines.get(line.lineNumber);

        if (
            !existingLine ||
            existingLine.content !== line.content ||
            line.depth !== existingLine.depth
        ) {
            if (firstModifiedLine === null) {
                firstModifiedLine = i;
            }
            lastModifiedLine = i;
        }
    }

    if (firstModifiedLine === null) {
        return;
    }

    clearCanvasRange(
        ctx,
        lines[firstModifiedLine].y_px,
        lines[lastModifiedLine!].y_px + LINE_HEIGHT_CPX - LINE_GAP_CPX,
    );

    let currentFillStyle = '',
        fillStyle = '';
    for (let i = firstModifiedLine; i <= lastModifiedLine!; i++) {
        const line = lines[i];

        for (const word of line.wordBlocks) {
            if (word.empty) continue;

            fillStyle = word.chunkType
                ? theme.chars[word.chunkType]
                : theme.wordBlock;
            if (fillStyle !== currentFillStyle) {
                currentFillStyle = fillStyle;
                ctx.fillStyle = fillStyle;
            }
            ctx.fillRect(word.x_px, line.y_px, word.width_px, BLOCK_HEIGHT_CPX);
        }

        ctx.fillStyle = theme.indentLine;
        for (const indentationLine of line.indentationLines) {
            ctx.fillRect(
                indentationLine.x_px,
                line.y_px,
                INDENT_BLOCK_WIDTH_CPX,
                indentationLine.height_px,
            );
        }

        drawnLines.set(line.lineNumber, line);
    }
};
