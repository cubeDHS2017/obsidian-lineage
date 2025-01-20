import { HorizontalContext } from 'src/view/actions/dnd/scroll-on-dnd-x/helpers/scroll-horizontally';

export const stopHorizontalReveal = (context: HorizontalContext) => {
    const isLeftEdge = context.state.direction === -1;
    if (isLeftEdge) {
        if (context.buffer) {
            const bufferRect = context.buffer.getBoundingClientRect();

            if (bufferRect.right - 100 > context.containerRect.left) {
                return true;
            }
        }
    } else if (context.state.direction === 1) {
        if (context.rightColumn) {
            const rect = context.rightColumn.getBoundingClientRect();
            if (rect.right + 100 < context.containerRect.right) {
                return true;
            }
        }
    }
};
