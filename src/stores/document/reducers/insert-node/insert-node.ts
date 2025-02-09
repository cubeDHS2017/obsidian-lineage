import { insertChild } from 'src/lib/tree-utils/insert/insert-child';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { LineageDocument } from 'src/stores/document/document-state-type';
import invariant from 'tiny-invariant';
import { id } from 'src/helpers/id';
import { insertParentSibling } from 'src/lib/tree-utils/insert/insert-parent-sibling';

export type CreateNodeAction = {
    type: 'DOCUMENT/INSERT_NODE';
    payload: {
        position: AllDirections;
        activeNodeId: string;
        content?: string;
    };
};
export const insertNode = (
    document: LineageDocument,
    position: AllDirections | 'right-last',
    activeNodeId: string,
    content?: string,
    newNodeId = id.node(),
) => {
    invariant(activeNodeId);

    if (position === 'right') {
        insertChild(document, activeNodeId, newNodeId, !content);
    } else if (position === 'right-last') {
        insertChild(document, activeNodeId, newNodeId, false);
    } else if (position === 'left') {
        insertParentSibling(document, activeNodeId, newNodeId);
    } else {
        const columnIndex = findNodeColumn(document.columns, activeNodeId);
        const column = document.columns[columnIndex];
        invariant(column);
        const group = findGroupByNodeId([column], activeNodeId);
        invariant(group, 'could not find group of ' + activeNodeId);

        const groupIndex = group.nodes.findIndex((c) => c === activeNodeId);

        const insertionIndex = position === 'up' ? groupIndex : groupIndex + 1;
        group.nodes.splice(insertionIndex, 0, newNodeId);
        group.nodes = [...group.nodes];
    }
    document.content[newNodeId] = {
        content: content || '',
    };

    return newNodeId;
};
