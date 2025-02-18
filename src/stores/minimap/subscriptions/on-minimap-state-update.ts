import { LineageView } from 'src/view/view';
import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';
import invariant from 'tiny-invariant';
import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { setScrollbarPosition } from 'src/stores/minimap/subscriptions/actions/set-scrollbar-position/set-scrollbar-position';
import { debouncedUpdateVisibleRange } from 'src/stores/minimap/subscriptions/effects/update-visible-range';
import { refreshScrollPosition } from 'src/view/components/container/minimap/event-handlers/on-canvas-wheel';

export const onMinimapStateUpdate = (
    view: LineageView,
    action: MinimapStoreAction,
    state: MinimapState,
) => {
    const minimapStore = view.minimapStore;
    invariant(minimapStore);
    if (action.type === 'minimap/set-card-ranges') {
        setScrollbarPosition(view);
        // simulates a mousewheel scroll, in case setScrollbarPosition does not dispatch an action
        refreshScrollPosition(view, 0);
    } else if (action.type === 'minimap/set-active-node') {
        if (state.ranges.cards[state.activeCardId]) {
            setScrollbarPosition(view);
        }
    } else if (action.type === 'minimap/set-scroll-position') {
        debouncedUpdateVisibleRange(view);
    }
};
