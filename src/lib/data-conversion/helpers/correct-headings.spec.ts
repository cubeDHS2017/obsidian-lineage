import { describe, expect, test } from 'vitest';
import { correctHeadings } from 'src/lib/data-conversion/helpers/correct-headings';

// some tests are inspired from https://github.com/platers/obsidian-linter/blob/952bba9d7b6a4f084d68ffdd469bd89e785206b2/__tests__/header-increment.test.ts#L1
describe('correctHeadings', () => {
    test('case 1', () => {
        const input = `
# H1
### H3
## H2
##### H5`;
        const expected = `
# H1
## H3
## H2
### H5`;
        expect(correctHeadings(input)).toBe(expected);
    });

    test('case 2', () => {
        const markdown = `
# H1
#### H4
###### H6`;
        const expected = `
# H1
## H4
### H6`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 3: decremented headings should stay under their previous parent', () => {
        const markdown = `
# H1
### H3
###### H6
##### H5
## H2`;
        const expected = `
# H1
## H3
### H6
### H5
## H2`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 4: decremented headings should stay under their previous parent', () => {
        const markdown = `
# H1
### H3
#### H4
###### H6
## H2
# H1
## H2
### H3
#### H4
###### H6
##### H5
### H3
`;
        const expected = `
# H1
## H3
### H4
#### H6
## H2
# H1
## H2
### H3
#### H4
##### H6
##### H5
### H3
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 5', () => {
        const markdown = `
# H1
### H3
#### H4
# H1
#### H4
###### H6
# H1
# H1
text
######### HN
text`;
        const expected = `
# H1
## H3
### H4
# H1
## H4
### H6
# H1
# H1
text
## HN
text`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 6', () => {
        const markdown = `
### H3
#### H4
# H1
##### H5
###### H6
`;
        const expected = `
# H3
## H4
# H1
## H5
### H6
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 7', () => {
        const markdown = `
### H3
##### H5
## H2
#### H4
###### H6`;
        const expected = `
## H3
### H5
## H2
### H4
#### H6`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 8', () => {
        const markdown = `
## H2
### H3
## H2
### H3
`;

        expect(correctHeadings(markdown)).toBe(markdown);
    });

    test('case 9: tag in title', () => {
        const markdown = `
# H1
##### H5 #tag
### H3
# H1
`;
        const expected = `
# H1
## H5 #tag
## H3
# H1
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 10', () => {
        const markdown = `
# H1
## H2
### H3
#### H4
`;
        expect(correctHeadings(markdown)).toBe(markdown);
    });

    test('case 11', () => {
        const markdown = `
This is a paragraph.
# H1
This is another paragraph.
### H3
`;
        const expected = `
This is a paragraph.
# H1
This is another paragraph.
## H3
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 12', () => {
        const markdown = `# H1`;
        expect(correctHeadings(markdown)).toBe(markdown);
    });

    test('case 13', () => {
        const markdown = `### H3`;
        expect(correctHeadings(markdown)).toBe(markdown);
    });

    test('case 14', () => {
        const markdown = `
# H1        
## H2
###### H6 
#### H4
## H2
`;
        const expected = `
# H1        
## H2
### H6 
### H4
## H2
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });

    test('case 15: maintain highest heading level', () => {
        const markdown = `
## H2
###### H6 
#### H4
## H2
`;
        const expected = `
## H2
### H6 
### H4
## H2
`;
        expect(correctHeadings(markdown)).toBe(expected);
    });
});
