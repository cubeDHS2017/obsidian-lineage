import { sectionsToJson } from 'src/lib/data-conversion/sections-to-json';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-outline';

export const sectionsToOutline = (input: string): string => {
    const tree = sectionsToJson(input);
    if (tree.length === 1 && tree[0].children.length === 0) return input;
    return jsonToOutline(tree);
};
