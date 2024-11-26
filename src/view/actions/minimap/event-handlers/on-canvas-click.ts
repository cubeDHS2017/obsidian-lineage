import { findCardAtPosition } from 'src/view/actions/minimap/event-handlers/helpers/find-card-at-position';
import {
    CANVAS_WIDTH_CPX,
    CANVAS_WIDTH_DPX,
} from 'src/view/actions/minimap/constants';
import { LineageView } from 'src/view/view';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';

export const dpx_to_cpx = (px: number) =>
    px * (CANVAS_WIDTH_CPX / CANVAS_WIDTH_DPX);

/** c stands for canvas, d stands for dom **/
export const cpx_to_dpx = (px: number) =>
    px * (CANVAS_WIDTH_DPX / CANVAS_WIDTH_CPX);

export const onCanvasClick = (e: MouseEvent, view: LineageView) => {
    const minimapStore = view.minimapStore;
    const dom = minimapStore.getDom();
    const state = minimapStore.getState();
    const rect = dom.canvas.getBoundingClientRect();

    const domY = e.clientY - rect.top;

    const y = dpx_to_cpx(domY);

    const cardId = findCardAtPosition(y, state.ranges.cards);
    if (cardId) {
        minimapStore.setActiveCardId(cardId);
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id: cardId,
            },
        });
        focusContainer(view);
    }
};
