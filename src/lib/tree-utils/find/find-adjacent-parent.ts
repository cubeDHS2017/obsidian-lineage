import { Column } from 'src/stores/document/document-state-type';
import { VerticalDirection } from 'src/stores/document/document-store-actions';
import { findNodeColumnAndParent } from 'src/lib/tree-utils/find/find-node-column-and-parent';
import { findSiblingNode } from 'src/lib/tree-utils/find/find-sibling-node';

export const findAdjacentParent = (
    columns: Column[],
    nodeToMove: string,
    direction: VerticalDirection,
) => {
    const [columnIndex, parentId] = findNodeColumnAndParent(
        columns,
        nodeToMove,
    )!;
    if (columnIndex > 0) {
        return findSiblingNode(columns, parentId, direction);
    }
    return null;
};
