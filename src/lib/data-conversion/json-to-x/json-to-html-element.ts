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

        const index = i + 1;
        if (text) text = text + '\n\n';

        let content = node.content.trimStart();

        if (content.match(/^#+ /)) {
            const headingLevel = content.match(/^#+/)?.[0];
            content = `${headingLevel} ${createHtmlElementMarker(parentNumber, index)}${content.slice(headingLevel!.length).trim()}`;
        } else if (content.startsWith('>')) {
            content = `> ${createHtmlElementMarker(parentNumber, index)}${content.slice(1).trim()}`;
        } else if (content.match(/^[-*+]\s\[.\]\s/)) {
            // tasks
            const taskPrefix = content.match(/^[-*+]\s\[.\]\s/)?.[0];
            content = `${taskPrefix}${createHtmlElementMarker(parentNumber, index)}${content.slice(taskPrefix!.length).trim()}`;
        } else if (content.match(/^[-*+]\s/)) {
            const bullet = content.match(/^[-*+]\s/)?.[0];
            content = `${bullet}${createHtmlElementMarker(parentNumber, index)}${content.slice(bullet!.length).trim()}`;
        } else if (content.match(/^\d+\.\s/)) {
            // numbered list
            const number = content.match(/^\d+\.\s/)?.[0];
            content = `${number} ${createHtmlElementMarker(parentNumber, index)}${content.slice(number!.length).trim()}`;
        } else if (content.startsWith('```')) {
            content = `${createHtmlElementMarker(parentNumber, index)}\n${content}`;
        } else if (content.startsWith('|')) {
            // table
            content = `${createHtmlElementMarker(parentNumber, index)}\n\n${content}`;
        } else {
            content = `${createHtmlElementMarker(parentNumber, index)}${content}`;
        }

        text += content;

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
