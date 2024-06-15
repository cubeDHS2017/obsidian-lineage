import { TreeNode } from 'src/lib/data-conversion/columns-to-json';
import { jsonToSections } from 'src/lib/data-conversion/json-to-sections';

export const splitByParagraph = (text: string): string[] => {
    return text.split(/\n\s*\n/);
};

export const paragraphsToSections = (input: string) => {
    const paragraphs = splitByParagraph(input);
    if (paragraphs.length === 1) return input;
    const tree = paragraphs.map((p) => ({
        content: p,
        children: [],
    })) satisfies TreeNode[];
    return jsonToSections(tree);
};
