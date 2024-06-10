import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';
import { hasNSections } from 'src/lib/format-detection/has-n-sections';
import { isOutline } from 'src/lib/format-detection/is-outline';
import { hasNBulletListItems } from 'src/lib/format-detection/has-n-bullet-list-items';

export const detectDocumentFormat = (text: string, strict = true) => {
    const { data } = extractFrontmatter(text);

    if (hasNSections(data, 1)) return 'document';
    if (isOutline(data)) return 'outline';
    if (!strict) {
        if (hasNBulletListItems(text, 1)) return 'outline';
    }
};
