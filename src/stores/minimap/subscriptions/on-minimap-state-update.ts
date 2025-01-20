import { LineageView } from 'src/view/view';
import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';
import invariant from 'tiny-invariant';
import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { debouncedApplyScrollPosition } from 'src/stores/minimap/subscriptions/effects/scroll-indicator/apply-scroll-position';
import { setScrollbarPosition } from 'src/stores/minimap/subscriptions/actions/set-scrollbar-position/set-scrollbar-position';

export const onMinimapStateUpdate = (
    view: LineageView,
    action: MinimapStoreAction,
    state: MinimapState,
) => {
    const minimapStore = view.minimapStore;
    invariant(minimapStore);
    if (action.type === 'minimap/set-card-ranges') {
        setScrollbarPosition(view);
    } else if (action.type === 'minimap/set-active-node') {
        if (state.ranges.cards[state.activeCardId]) {
            setScrollbarPosition(view);
        }
    } else if (action.type === 'minimap/set-scroll-position') {
        debouncedApplyScrollPosition(state.scrollInfo, view.getMinimapDom());
    }
};
