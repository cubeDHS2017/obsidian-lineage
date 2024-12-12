import { describe, expect, test } from 'vitest';
import { getFileNameFromContent } from 'src/obsidian/commands/helpers/extract-branch/helpers/get-file-name-of-extracted-branch/get-file-name-from-content';

const examples = [
    {
        input: `a`,
        output: 'a',
    },
    {
        input: `# a\nb `,
        output: 'a',
    },
    {
        input: 'a\nb',
        output: 'a b',
    },
    { input: '\na\nb', output: 'a b' },
    {
        input: '',
        output: undefined,
    },
    {
        input:
            Array.from({ length: 150 })
                .map(() => 'a')
                .join('') + '\nb',
        output: Array.from({ length: 100 })
            .map(() => 'a')
            .join(''),
    },
    {
        input: `- text that has an 's' letter`,
        output: "text that has an 's' letter",
    },
    {
        input: `### a\nb `,
        output: 'a',
    },
    {
        input: `## multiple word heading\nsome additional text`,
        output: 'multiple word heading',
    },
    {
        input: `\t- tabbed list`,
        output: 'tabbed list',
    },
    {
        input: `mixed content\n## heading after initial text`,
        output: 'heading after initial text',
    },
    {
        input: `   \t# heading with leading whitespace\nadditional text`,
        output: 'heading with leading whitespace',
    },
    {
        input: `# 🌟 emoji heading`,
        output: '🌟 emoji heading',
    },
    {
        input: `## Heading with special ch@r@cters!`,
        output: 'Heading with special ch@r@cters!',
    },

    {
        input: `\n\n# Heading with Multiple Newlines\n\n`,
        output: 'Heading with Multiple Newlines',
    },
    {
        input: `Multiple\nLine\nText`,
        output: 'Multiple Line Text',
    },
];

describe('get file name from content', () => {
    for (const example of examples) {
        test(example.input, () => {
            expect(getFileNameFromContent(example.input)).toEqual(
                example.output,
            );
        });
    }
});
