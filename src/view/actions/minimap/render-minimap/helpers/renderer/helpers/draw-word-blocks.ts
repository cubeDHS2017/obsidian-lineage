import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';

export const drawWordBlocks = (
    ctx: OffscreenCanvasRenderingContext2D,
    wordBlocks: WordBlock[],
    activeCardId: string,
    theme: MinimapTheme,
) => {
    for (const word of wordBlocks) {
        if (word.empty) continue;
        const isActive = word.cardId === activeCardId;

        ctx.globalAlpha = isActive
            ? theme.isLightTheme
                ? 0.5
                : 1
            : word.chunkType
              ? 0.8
              : 0.5;
        if (word.chunkType) {
            ctx.fillStyle = theme.chars[word.chunkType];
        } else {
            ctx.fillStyle = theme.wordBlock;
        }

        ctx.beginPath();
        ctx.roundRect(word.x_px, word.y_px, word.width_px, word.height_px, 1);
        ctx.fill();
    }
};
