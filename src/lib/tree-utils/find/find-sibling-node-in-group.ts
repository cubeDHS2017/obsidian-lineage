import { Column, NodeId } from 'src/stores/document/document-state-type';
import { VerticalDirection } from 'src/stores/document/document-store-actions';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import invariant from 'tiny-invariant';

export const findSiblingNodeInGroup = (
    columns: Column[],
    node: NodeId,
    direction: VerticalDirection,
) => {
    const group = findGroupByNodeId(columns, node);
    invariant(group);
    const nodeIndex = group.nodes.findIndex((n) => n === node);
    return group.nodes[nodeIndex + (direction === 'up' ? -1 : 1)];
};
