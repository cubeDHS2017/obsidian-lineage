import { stopHorizontalReveal } from 'src/view/actions/dnd/scroll-on-dnd-x/helpers/stop-horizontal-reveal';
import { ScrollState } from 'src/view/actions/dnd/scroll-on-dnd-y/scroll-on-dnd-y';

const horizontalScrollStep = 30;

export type HorizontalContext = {
    state: ScrollState;
    buffer: HTMLElement;
    columnsContainer: HTMLElement;
    containerRect: DOMRect;
    rightColumn: HTMLElement | null;
};

export const scrollHorizontally = (context: HorizontalContext) => {
    if (context.state.direction === 0) return;
    if (stopHorizontalReveal(context)) return;

    context.columnsContainer.scrollLeft +=
        context.state.direction * horizontalScrollStep;
    requestAnimationFrame(() => scrollHorizontally(context));
};
