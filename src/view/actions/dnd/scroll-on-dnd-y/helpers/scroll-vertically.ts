import { stopVerticalReveal } from 'src/view/actions/dnd/scroll-on-dnd-y/helpers/stop-vertical-reveal';
import { ScrollState } from 'src/view/actions/dnd/scroll-on-dnd-y/scroll-on-dnd-y';

const verticalScrollStep = 15;

export type Context = {
    containerRect: DOMRect;
    state: ScrollState;
    columns: HTMLElement[];
    edge: HTMLElement;
};

export const scrollVertically = (context: Context) => {
    if (context.state.direction === 0) return;

    for (const column of context.columns) {
        if (stopVerticalReveal(context, column)) continue;
        column.scrollTop += context.state.direction * verticalScrollStep;
    }

    requestAnimationFrame(() => scrollVertically(context));
};
