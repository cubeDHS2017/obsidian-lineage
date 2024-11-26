import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';
import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { IndentationLine } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';

export type DrawWordMinimapProps = {
    wordBlocks: WordBlock[];
    activeCardId: string;
    canvasId: string;
    canvasHeight: number;
    lines: IndentationLine[];
    theme: MinimapTheme;
};

export const drawMinimap = (
    props: DrawWordMinimapProps,
    canvas: OffscreenCanvas,
    ctx: OffscreenCanvasRenderingContext2D,
) => {
    canvas.height = props.canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const word of props.wordBlocks) {
        const isActive = word.cardId === props.activeCardId;

        if (isActive) {
            if (word.empty) {
                ctx.fillStyle = props.theme.wordBlockEmptyActive;
            } else {
                ctx.fillStyle = props.theme.wordBlockActive;
            }
        } else {
            if (word.empty) {
                ctx.fillStyle = props.theme.wordBlockEmptyInactive;
            } else {
                ctx.fillStyle = props.theme.wordBlockInactive;
            }
        }
        ctx.beginPath();
        ctx.roundRect(word.x_px, word.y_px, word.width_px, word.height_px, 1);
        ctx.fill();
    }

    for (const line of props.lines) {
        ctx.beginPath();
        ctx.fillStyle = props.theme.indentLine;
        ctx.roundRect(line.x_px, line.y_px, line.width_px, line.height_px, 1);
        ctx.fill();
    }
};
