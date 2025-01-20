import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { id } from 'src/helpers/id';

export const defaultMinimapState = (): MinimapState => ({
    canvasId: id.canvas(),
    activeCardId: '',
    scrollInfo: {
        totalDrawnHeight_cpx: 0,
        scrollPosition_cpx: 0,
    },
    ranges: {
        cards: {},
    },
});
