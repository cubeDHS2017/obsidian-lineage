import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';

const updateDocumentState = (
    state: MinimapState,
    action: MinimapStoreAction,
) => {
    if (action.type === 'minimap/set-card-ranges') {
        state.ranges.cards = action.payload.ranges;
        state.scrollInfo.totalDrawnHeight_cpx = action.payload.height_cpx;
    } else if (action.type === 'minimap/set-active-node') {
        state.activeCardId = action.payload.id;
    } else if (action.type === 'minimap/set-scroll-position') {
        state.scrollInfo.scrollPosition_cpx = action.payload.position_cpx;
    }
};
export const minimapReducer = (
    store: MinimapState,
    action: MinimapStoreAction,
): MinimapState => {
    updateDocumentState(store, action);
    return store;
};
