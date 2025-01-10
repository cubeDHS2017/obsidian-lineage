import { calculateScrollLeft } from 'src/lib/align-element/helpers/calculate-scroll-left';

import { THRESHOLD } from 'src/lib/align-element/constants';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { getElementById } from 'src/lib/align-element/helpers/get-element-by-id';

export const alignElementHorizontally = (
    context: AlignBranchContext,
    id: string,
    center: boolean,
    scrollToTheLeft = false,
) => {
    const element = getElementById(context.container, id);
    if (!element) return;
    const column = element.matchParent('.column') as HTMLElement;
    if (!column) return;
    const elementRect = element.getBoundingClientRect();

    const scrollLeft = calculateScrollLeft(
        elementRect,
        context.containerRect,
        center,
        scrollToTheLeft,
    );
    if (Math.abs(scrollLeft) > THRESHOLD)
        context.container.scrollBy({
            left: scrollLeft * -1,
            behavior: scrollToTheLeft ? 'instant' : context.settings.behavior,
        });

    return column.id;
};
