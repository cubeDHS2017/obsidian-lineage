import { parseDelimiter } from 'src/lib/data-conversion/helpers/delimiter';
import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';

export const detectDocumentFormat = (text: string) => {
    const { data } = extractFrontmatter(text);
    const lines = data.split('\n');

    let foundBulletPoints = 0;
    for (const line of lines) {
        if (parseDelimiter(line)) {
            return 'document';
        } else if (line.match(/^(\t*)- (.+)/)) {
            foundBulletPoints++;
        }
    }
    if (foundBulletPoints > 0) return 'outline';
};
