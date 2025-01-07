import { getCombinedBoundingClientRect } from 'src/lib/align-element/helpers/get-combined-client-rect';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { alignVertically } from 'src/lib/align-element/align-element-vertically';

export const alignGroupOfElementsVertically = (
    context: AlignBranchContext,
    elements: HTMLElement[],
    center = true,
): string | undefined => {
    const column = elements[0].matchParent('.column') as HTMLElement;
    if (!column) return;

    const elementRect = getCombinedBoundingClientRect(elements);
    return alignVertically(context, elementRect, column, center);
};
