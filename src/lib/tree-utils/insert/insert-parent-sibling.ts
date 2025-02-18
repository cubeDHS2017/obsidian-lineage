import { LineageDocument } from 'src/stores/document/document-state-type';
import { findNodeColumnAndParent } from 'src/lib/tree-utils/find/find-node-column-and-parent';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { SilentError } from 'src/lib/errors/errors';

export const insertParentSibling = (
    document: Pick<LineageDocument, 'columns'>,
    nodeId: string,
    newNodeId: string,
) => {
    const column = findNodeColumnAndParent(document.columns, nodeId);
    if (!column) throw new Error('could not find parent column');
    if (column[0] === 0) {
        throw new SilentError(
            "can't create parent sibling for first column nodes",
        );
    }
    const parentId = column[1];

    const parentGroup = findGroupByNodeId(document.columns, parentId);

    if (!parentGroup) throw new Error('could not find group of parent node');
    parentGroup.nodes = [...parentGroup.nodes, newNodeId];
};
