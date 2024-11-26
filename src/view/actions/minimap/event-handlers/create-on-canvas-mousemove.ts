import { debounce } from 'obsidian';
import { LineageView } from 'src/view/view';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { findCardAtPosition } from 'src/view/actions/minimap/event-handlers/helpers/find-card-at-position';
import { dpx_to_cpx } from 'src/view/actions/minimap/event-handlers/on-canvas-click';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

export const createOnCanvasMousemove = (view: LineageView) => {
    let lastActiveCardId: string | null = null;

    const minimapStore = view.minimapStore;
    const dom = minimapStore.getDom();
    const state = minimapStore.getState();
    const hoverHandler = debounce((e: MouseEvent) => {
        if (!(e.buttons === 1 || (isMacLike ? e.metaKey : e.ctrlKey))) return;
        const rect = dom.canvas.getBoundingClientRect();

        const domY = e.clientY - rect.top;
        const y = dpx_to_cpx(domY);

        const cardId = findCardAtPosition(y, state.ranges.cards, 0);
        if (cardId && cardId !== lastActiveCardId) {
            lastActiveCardId = cardId;
            minimapStore.setActiveCardId(cardId);
            view.viewStore.dispatch({
                type: 'DOCUMENT/SET_ACTIVE_NODE',
                payload: {
                    id: cardId,
                },
            });
            focusContainer(view);
        }
    }, 100);

    return (e: MouseEvent) => hoverHandler(e);
};
