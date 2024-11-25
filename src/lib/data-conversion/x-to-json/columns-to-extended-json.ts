import { Columns, Content } from 'src/stores/document/document-state-type';
import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';

const createTreeNode = (id: string, content = ''): ExtendedTreeNode => {
    return {
        id,
        content: content.trim(),
        children: [],
    };
};

export type ExtendedTreeNode = TreeNode & {
    id: string;
    children: ExtendedTreeNode[];
};

export const columnsToExtendedJson = (columns: Columns, content: Content) => {
    const nodeMap: { [id: string]: ExtendedTreeNode } = {};
    for (const column of columns) {
        for (const group of column.groups) {
            for (const node of group.nodes) {
                const treeNode = createTreeNode(node, content[node]?.content);
                let parentNode: ExtendedTreeNode = nodeMap[group.parentId];
                if (!parentNode) {
                    parentNode = createTreeNode(group.parentId);
                    nodeMap[group.parentId] = parentNode;
                }
                parentNode.children.push(treeNode);
                nodeMap[node] = treeNode;
            }
        }
    }

    const roots: ExtendedTreeNode[] = [];
    if (columns[0])
        for (const group of columns[0].groups) {
            for (const node of group.nodes) {
                const treeNode = nodeMap[node];
                if (treeNode) {
                    roots.push(treeNode);
                } else {
                    throw new Error(`could not find node ${node}`);
                }
            }
        }

    return roots;
};
