import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { jsonToHtmlComment } from 'src/lib/data-conversion/json-to-x/json-to-html-comment';

export const jsonToText = (nodes: TreeNode[]): string => {
    return jsonToHtmlComment(nodes, undefined, undefined, false);
};
