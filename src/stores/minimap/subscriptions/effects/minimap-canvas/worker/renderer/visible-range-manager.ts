import { VISIBILITY_MARGIN_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';

export type VisibleRange = { start_cpx: number; end_cpx: number };

export class VisibleRangeManager {
    #visibleRange: VisibleRange;
    private canvas_height_cpx: number;
    constructor(canvas_height_cpx: number) {
        this.canvas_height_cpx = canvas_height_cpx;
        this.calculateRenderedRange(0);
    }

    updateScrollPosition(scroll_position_cpx: number) {
        const visibleStart = scroll_position_cpx;
        const visibleEnd = scroll_position_cpx + this.canvas_height_cpx;
        if (
            visibleStart < this.#visibleRange.start_cpx ||
            visibleEnd > this.#visibleRange.end_cpx
        ) {
            this.calculateRenderedRange(scroll_position_cpx);

            return true;
        }
        return false;
    }

    private calculateRenderedRange(scroll_position_cpx: number) {
        const start = Math.max(0, scroll_position_cpx - VISIBILITY_MARGIN_CPX);
        const end =
            scroll_position_cpx +
            this.canvas_height_cpx +
            VISIBILITY_MARGIN_CPX;
        this.#visibleRange = { start_cpx: start, end_cpx: end };
    }

    get visibleRange() {
        return this.#visibleRange;
    }
}
