import { describe, expect, it } from 'vitest';
import { getHeadings } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-headings';

describe('getHeadings', () => {
    it('should return an empty array when there are no headings', () => {
        const content = 'This is a paragraph.\nAnother line without headings.';
        expect(getHeadings(content)).toEqual([]);
    });

    it('should return an array of headings from the content', () => {
        const content = '# Heading 1\nSome text\n## Heading 2\n### Heading 3';
        expect(getHeadings(content)).toEqual([
            'Heading 1',
            'Heading 2',
            'Heading 3',
        ]);
    });

    it('should ignore non-heading lines', () => {
        const content =
            'This is a paragraph.\n# Heading 1\nAnother line.\n## Heading 2';
        expect(getHeadings(content)).toEqual(['Heading 1', 'Heading 2']);
    });

    it('should handle content with no matching headings', () => {
        const content = 'Just some text.\nNo headings here.';
        expect(getHeadings(content)).toEqual([]);
    });

    it('should handle headings with extra spaces', () => {
        const content = '#   Heading with spaces  \n##Another heading';
        expect(getHeadings(content)).toEqual(['  Heading with spaces  ']);
    });

    it('should return an empty array for empty content', () => {
        const content = '';
        expect(getHeadings(content)).toEqual([]);
    });

    it('should handle headings of different levels', () => {
        const content = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6';
        expect(getHeadings(content)).toEqual([
            'H1',
            'H2',
            'H3',
            'H4',
            'H5',
            'H6',
        ]);
    });

    it('should ignore headings not at the start of the line', () => {
        const content =
            'Some text # Heading 1\nAnother text\n## Valid Heading 2';
        expect(getHeadings(content)).toEqual(['Valid Heading 2']);
    });

    it('should ignore tags that resemble headings but are not at the start of the line', () => {
        const content =
            'Text with #inline-tag and ##inline-heading\n# Valid Heading';
        expect(getHeadings(content)).toEqual(['Valid Heading']);
    });

    it('should correctly extract headings that are at the start of the line but not mistaken tags', () => {
        const content = '###Valid Heading\nSome other text';
        expect(getHeadings(content)).toEqual([]);
    });
});
