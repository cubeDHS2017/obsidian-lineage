import { cleanAndSortColumns } from 'src/lib/tree-utils/sort/clean-and-sort-columns';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { deleteChildNodes } from 'src/lib/tree-utils/delete/delete-child-nodes';
import { isLastRootNode } from 'src/lib/tree-utils/assert/is-last-root-node';
import invariant from 'tiny-invariant';
import { findNextActiveNode } from 'src/lib/tree-utils/find/find-next-active-node';
import { deleteNodeById } from 'src/lib/tree-utils/delete/delete-node-by-id';
import { lang } from 'src/lang/lang';

export type DeleteNodeAction = {
    type: 'DOCUMENT/DELETE_NODE';
    payload: {
        activeNodeId: string;
        selectedNodes?: Set<string>;
    };
};

export const deleteNode = (
    document: LineageDocument,
    nodeId: string,
    selectedNodes?: Set<string>,
) => {
    invariant(nodeId);

    const isSelection = selectedNodes && selectedNodes.size > 1;
    const nodes: string[] = isSelection ? [...selectedNodes] : [nodeId];

    let nextNode: string | undefined = undefined;
    for (const nodeId of nodes) {
        const lastNode = isLastRootNode(document.columns, nodeId);
        if (lastNode) {
            if (isSelection) break;
            else throw new Error(lang.error_delete_last_node);
        }

        nextNode = findNextActiveNode(document.columns, nodeId, {
            type: 'DOCUMENT/DELETE_NODE',
            payload: {
                activeNodeId: nodeId,
            },
        });
        invariant(nextNode);
        deleteChildNodes(document, nodeId);
        deleteNodeById(document.columns, document.content, nodeId);
        cleanAndSortColumns(document);
    }
    invariant(nextNode);
    return nextNode;
};
