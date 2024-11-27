import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';
import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { IndentationLine } from 'src/view/actions/minimap/positioning/calculate-indentation-lines';
import { CardRange } from 'src/view/actions/minimap/minimap';
import { LINE_HEIGHT_CPX } from 'src/view/actions/minimap/constants';

export type DrawWordMinimapProps = {
    wordBlocks: WordBlock[];
    activeCardId: string;
    canvasId: string;
    canvasHeight: number;
    lines: IndentationLine[];
    theme: MinimapTheme;
    activeCardRange: CardRange;
    isLightTheme: boolean;
};

export const drawMinimap = (
    props: DrawWordMinimapProps,
    canvas: OffscreenCanvas,
    ctx: OffscreenCanvasRenderingContext2D,
) => {
    canvas.height = props.canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const word of props.wordBlocks) {
        if (word.empty) continue;
        const isActive = word.cardId === props.activeCardId;

        ctx.globalAlpha = isActive
            ? props.isLightTheme
                ? 0.5
                : 1
            : word.chunkType
              ? 0.8
              : 0.5;
        if (word.chunkType) {
            ctx.fillStyle = props.theme.chars[word.chunkType];
        } else {
            ctx.fillStyle = props.theme.wordBlock;
        }

        ctx.beginPath();
        ctx.roundRect(word.x_px, word.y_px, word.width_px, word.height_px, 1);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
    for (const line of props.lines) {
        ctx.beginPath();
        ctx.fillStyle = props.theme.indentLine;
        ctx.roundRect(line.x_px, line.y_px, line.width_px, line.height_px, 1);
        ctx.fill();
    }

    if (props.activeCardRange) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = props.theme.wordBlock;
        ctx.fillRect(
            0,
            props.activeCardRange.y_start - LINE_HEIGHT_CPX,
            canvas.width,
            LINE_HEIGHT_CPX * 2 +
                (props.activeCardRange.y_end - props.activeCardRange.y_start),
        );

        ctx.globalAlpha = 1.0;
    }
};
