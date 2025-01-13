import { ViewState } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { getAllChildren } from 'src/lib/tree-utils/get/get-all-children';

export const collapseNode = (
    state: Pick<ViewState, 'outline'>,
    columns: Column[],
    id: string,
) => {
    const children = getAllChildren(columns, id);
    state.outline.collapsedParents.add(id);
    for (const child of children) {
        state.outline.hiddenNodes.add(child);
    }
};
