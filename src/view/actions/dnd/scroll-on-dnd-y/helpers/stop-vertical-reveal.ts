import { Context } from 'src/view/actions/dnd/scroll-on-dnd-y/helpers/scroll-vertically';
import { getVerticalBuffer } from 'src/view/actions/dnd/scroll-on-dnd-y/helpers/get-vertical-buffer';

export const stopVerticalReveal = (context: Context, column: HTMLElement) => {
    const buffer = getVerticalBuffer(context.state.direction, column);
    if (!buffer) return true;
    if (context.state.direction === -1) {
        const bufferBottom = buffer.getBoundingClientRect().bottom;
        return bufferBottom - 100 > context.containerRect.top;
    } else if (context.state.direction === 1) {
        const bufferTop = buffer.getBoundingClientRect().top;
        return bufferTop + 100 < context.containerRect.bottom;
    }
};
