import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { jsonToHtmlComment } from 'src/lib/data-conversion/json-to-x/json-to-html-comment';

export const splitByParagraph = (text: string): string[] => {
    return text.split(/\n\s*\n/);
};

export const paragraphsToHtmlComment = (input: string) => {
    const paragraphs = splitByParagraph(input);
    if (paragraphs.length === 1) return input;
    const tree = paragraphs.map((p) => ({
        content: p,
        children: [],
    })) satisfies TreeNode[];
    return jsonToHtmlComment(tree);
};
