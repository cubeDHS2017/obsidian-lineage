import { jsonToSections } from 'src/lib/data-conversion/json-to-sections';
import { outlineToJson } from 'src/lib/data-conversion/outline-to-json';

export const outlineToSections = (input: string): string => {
    const tree = outlineToJson(input);
    if (tree.length === 1 && tree[0].children.length === 0) return input;
    return jsonToSections(tree);
};
