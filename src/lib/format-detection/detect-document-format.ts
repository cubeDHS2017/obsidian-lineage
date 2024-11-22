import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';
import { hasNHtmlCommentMarker } from 'src/lib/format-detection/has-n-html-comment-marker';
import { isOutline } from 'src/lib/format-detection/is-outline';
import { hasNBulletListItems } from 'src/lib/format-detection/has-n-bullet-list-items';
import { hasNHtmlElementMarker } from 'src/lib/format-detection/has-n-html-element-markers';

export const detectDocumentFormat = (text: string, strict = true) => {
    const { data } = extractFrontmatter(text);

    if (hasNHtmlCommentMarker(data, 1)) return 'sections';
    if (hasNHtmlElementMarker(data, 1)) return 'html-element';
    if (isOutline(data)) return 'outline';
    if (!strict) {
        if (hasNBulletListItems(text, 1)) return 'outline';
    }
};
