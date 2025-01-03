import { calculateScrollTop } from 'src/lib/align-element/helpers/calculate-scroll-top';
import { calculateScrollLeft } from 'src/lib/align-element/helpers/calculate-scroll-left';

import { THRESHOLD } from 'src/lib/align-element/constants';
import { AlignBranchSettings } from 'src/stores/view/subscriptions/effects/align-branch/helpers/match-action-to-settings';

export type AlignBranchState = { columns: Set<string> };

export const alignElementVAndH = (
    container: HTMLElement,
    element: HTMLElement,
    settings: AlignBranchSettings,
) => {
    const column = element.matchParent('.column') as HTMLElement;

    if (!column) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = (
        container.parentElement as HTMLElement
    ).getBoundingClientRect();

    const scrollLeft = calculateScrollLeft(
        elementRect,
        containerRect,
        settings.centerActiveNodeH,
        false,
    );
    if (Math.abs(scrollLeft) > THRESHOLD)
        container.scrollBy({
            left: scrollLeft * -1,
            behavior: settings.behavior,
        });

    const scrollTop = calculateScrollTop(
        elementRect,
        containerRect,
        settings.centerActiveNodeV,
    );
    if (Math.abs(scrollTop) > THRESHOLD)
        column.scrollBy({
            top: (scrollTop * -1) / settings.zoomLevel,
            behavior: settings.behavior,
        });

    return column.id;
};
