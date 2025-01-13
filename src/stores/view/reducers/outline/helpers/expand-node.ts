import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { getAllChildren } from 'src/lib/tree-utils/get/get-all-children';

export const expandNode = (
    state: Pick<ViewState, 'outline'>,
    columns: Column[],
    id: string,
) => {
    state.outline.collapsedParents.delete(id);
    const children = getAllChildren(columns, id);
    if (children.length > 0) {
        for (const child of children) {
            state.outline.hiddenNodes.delete(child);
        }
        // re-collapse previously collapsed nodes
        const childrenSet = new Set(children);
        const collapsedParents = Array.from(
            state.outline.collapsedParents,
        ).filter((id) => childrenSet.has(id));
        for (const collapsedParent of collapsedParents) {
            const children = getAllChildren(columns, collapsedParent);
            for (const child of children) {
                state.outline.hiddenNodes.add(child);
            }
        }
    }
};
