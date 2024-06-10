import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';
import { hasNSections } from 'src/lib/format-detection/has-n-sections';
import { isOutline } from 'src/lib/format-detection/is-outline';

export const detectDocumentFormat = (text: string) => {
    const { data } = extractFrontmatter(text);

    if (hasNSections(data, 1)) return 'document';
    if (isOutline(data)) return 'outline';
};
