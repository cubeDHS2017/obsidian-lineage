import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignGroupOfElementsVertically } from 'src/lib/align-element/align-group-of-elements-vertically';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const alignChildGroupOfColumn = (
    context: AlignBranchContext,
    columnId: string,
) => {
    const columnElement = getNodeElement(context.container, columnId);
    if (!columnElement) return;

    const elements: HTMLElement[] = [];
    for (const childGroup of context.viewState.document.activeBranch
        .childGroups) {
        const element = getNodeElement(columnElement, 'group-' + childGroup);
        if (element) {
            elements.push(element);
        }
    }

    alignGroupOfElementsVertically(context, elements);
};
