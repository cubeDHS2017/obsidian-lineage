import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';
import { calculateScrollLeft } from 'src/lib/align-element/helpers/calculate-scroll-left';
import { THRESHOLD } from 'src/lib/align-element/constants';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export type PartialDOMRect = Pick<DOMRect, 'top' | 'height'>;

export type AlignBranchState = {
    columns: Set<string>;
    activeNodeRect?: PartialDOMRect;
};

export const alignElementVAndH = (
    context: AlignBranchContext,
    element: HTMLElement,
) => {
    const column = element.matchParent('.column') as HTMLElement;

    if (!column) return;

    const elementRect = element.getBoundingClientRect();

    const scrollLeft = calculateScrollLeft(
        elementRect,
        context.containerRect,
        context.settings.centerActiveNodeH,
        false,
    );
    if (Math.abs(scrollLeft) > THRESHOLD)
        context.container.scrollBy({
            left: scrollLeft * -1,
            behavior: context.settings.behavior,
        });

    const scrollTop = calculateScrollTop(
        elementRect,
        context.containerRect,
        context.settings.centerActiveNodeV,
    );
    if (Math.abs(scrollTop) > THRESHOLD)
        column.scrollBy({
            top: (scrollTop * -1) / context.settings.zoomLevel,
            behavior: context.settings.behavior,
        });

    return {
        columnId: column.id,
        activeNodeRect: {
            height: elementRect.height,
            top: elementRect.top + scrollTop,
        } satisfies PartialDOMRect,
    };
};
