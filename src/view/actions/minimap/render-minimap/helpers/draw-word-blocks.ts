import { MinimapDomElements } from 'src/view/actions/minimap/minimap';
import { WordBlock } from 'src/view/actions/minimap/positioning/calculate-word-blocks/calculate-word-blocks';
import { minimapColors } from 'src/view/actions/minimap/minimap-colors';

export const drawWordBlocks = (
    ctx: MinimapDomElements['ctx'],
    wordBlocks: WordBlock[],
    activeCardId: string,
) => {
    for (const word of wordBlocks) {
        const isActive = word.cardId === activeCardId;

        if (isActive) {
            if (word.empty) {
                ctx.fillStyle = minimapColors.current.wordBlockEmptyActive;
            } else {
                ctx.fillStyle = minimapColors.current.wordBlockActive;
            }
        } else {
            if (word.empty) {
                ctx.fillStyle = minimapColors.current.wordBlockEmptyInactive;
            } else {
                ctx.fillStyle = minimapColors.current.wordBlockInactive;
            }
        }
        ctx.beginPath();
        ctx.roundRect(word.x_px, word.y_px, word.width_px, word.height_px, 1);
        ctx.fill();
    }
};
