import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { level } from 'src/lib/data-conversion/helpers/html-comment-marker/create-html-comment-marker';
import { createHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/create-html-element-marker';

export const jsonToHtmlElement = (
    tree: TreeNode[],
    parentNumber = '',
    text = '',
) => {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        const lines = node.content.split('\n');
        const index = i + 1;
        lines[0] = lines[0] + createHtmlElementMarker(parentNumber, index);

        if (text) text = text + '\n\n';
        text += lines.join('\n');
        if (node.children.length > 0) {
            text = jsonToHtmlElement(
                node.children,
                level(parentNumber, index),
                text,
            );
        }
    }
    return text;
};
