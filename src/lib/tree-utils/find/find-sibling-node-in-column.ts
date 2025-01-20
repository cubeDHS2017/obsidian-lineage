import { VerticalDirection } from 'src/stores/document/document-store-actions';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import { Column, NodeId } from 'src/stores/document/document-state-type';

export const findSiblingNodeInColumn = (
    columns: Column[],
    node: NodeId,
    direction: VerticalDirection,
) => {
    const columnIndex = findNodeColumn(columns, node);
    const column = columns[columnIndex];
    const flatColumn = column.groups.map((g) => g.nodes).flat();
    const nodeIndex = flatColumn.findIndex((n) => n === node);
    return flatColumn[nodeIndex + (direction === 'up' ? -1 : 1)];
};
