import { Column, NodeId } from 'src/stores/document/document-state-type';
import { VerticalDirection } from 'src/stores/document/document-store-actions';
import { findSiblingNodeInGroup } from 'src/lib/tree-utils/find/find-sibling-node-in-group';

export const findSiblingNode = (
    columns: Column[],
    node: NodeId,
    direction: VerticalDirection | 'right',
) => {
    return findSiblingNodeInGroup(
        columns,
        node,
        direction === 'right' ? 'up' : direction,
    );
};
