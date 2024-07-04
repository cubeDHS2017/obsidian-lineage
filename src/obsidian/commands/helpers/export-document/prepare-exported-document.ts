import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';
import { sectionsToJson } from 'src/lib/data-conversion/sections-to-json';
import { jsonToText } from 'src/lib/data-conversion/json-to-text';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { outlineToJson } from 'src/lib/data-conversion/outline-to-json';

export const prepareExportedDocument = (
    fileData: string,
    basename: string,
    format: LineageDocumentFormat,
) => {
    const { data, frontmatter } = extractFrontmatter(fileData);
    const tree =
        format === 'outline' ? outlineToJson(data) : sectionsToJson(data);
    if (tree.length < 2 && tree[0].children.length == 0) {
        throw new Error(`File ${basename} does not appear to be a tree`);
    }
    return (frontmatter ? frontmatter + '\n' : '') + jsonToText(tree);
};
