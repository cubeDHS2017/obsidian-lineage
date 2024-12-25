import {
    INDENT_BLOCK_TOTAL_WIDTH_CPX,
    LINE_GAP_CPX,
    LINE_HEIGHT_CPX,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { MinimapLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';

export type IndentationLine = {
    x_px: number;
    height_px: number;
};

export const calculateIndentationLines = (lines: MinimapLine[]) => {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const lineDepth = line.depth;
        const nextLine = lines[i + 1];
        let lastLineOfCard = true;
        if (nextLine) {
            if (nextLine.nodeId === line.nodeId) {
                lastLineOfCard = false;
            }
        }

        for (let depth = 0; depth < lineDepth; depth++) {
            const x = depth * INDENT_BLOCK_TOTAL_WIDTH_CPX;

            line.indentationLines.push({
                x_px: x,
                height_px:
                    LINE_HEIGHT_CPX - (lastLineOfCard ? LINE_GAP_CPX : 0),
            });
        }
    }
};
