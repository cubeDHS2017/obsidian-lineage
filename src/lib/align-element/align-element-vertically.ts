import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';
import { THRESHOLD } from 'src/lib/align-element/constants';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { calculateScrollTopRelative } from 'src/lib/align-element/helpers/calculate-scroll-top-relative';

export const alignVertically = (
    context: AlignBranchContext,
    elementRect: DOMRect,
    column: HTMLElement,
    center: boolean,
): string | undefined => {
    const scrollTop = context.state.activeNodeRect
        ? calculateScrollTopRelative(
              elementRect,
              context.containerRect,
              context.state.activeNodeRect,
          )
        : calculateScrollTop(elementRect, context.containerRect, center);

    if (Math.abs(scrollTop) > THRESHOLD) {
        column.scrollBy({
            top: (scrollTop * -1) / context.settings.zoomLevel,
            behavior: context.settings.behavior,
        });
    }

    return column.id;
};

export const alignElementVertically = (
    context: AlignBranchContext,
    element: HTMLElement,
    center: boolean,
): string | undefined => {
    const column = element.matchParent('.column') as HTMLElement;
    if (!column) return;

    const elementRect = element.getBoundingClientRect();
    return alignVertically(context, elementRect, column, center);
};
