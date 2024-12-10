import { describe, expect, test } from 'vitest';
import { formatText } from 'src/view/actions/markdown-preview/helpers/format-text';
import { generateLoremIpsumWithMarkdown } from 'src/helpers/test-helpers/generate-lorem-ipsum-with.markdown';

describe('format-text', () => {
    test('case 1: empty line', () => {
        const input = ['text', '', 'text'].join('\n');
        const output = ['text', '&nbsp;', 'text'].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });
    test('case 2: has task', () => {
        const input = ['- text', '', 'text', ''].join('\n');
        const output = ['- text', '', 'text', '&nbsp;'].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });
    test('case 3: has callout', () => {
        const input = ['text', '> [callout]', '> text', '', 'text', ''].join(
            '\n',
        );
        const output = [
            'text',
            '> [callout]',
            '> text',
            '',
            'text',
            '&nbsp;',
        ].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });

    test('case 4: has block id', () => {
        const input = [
            'text',
            '> [callout]',
            '> text',
            '',
            'text',
            '',
            'text ^bloc1',
        ].join('\n');
        const output = [
            'text',
            '> [callout]',
            '> text',
            '',
            'text',
            '&nbsp;',
            'text <sup class="cm-blockid" data-block-id="^bloc1">^bloc1</sup>',
        ].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });

    test('case 4: has obsidian comments', () => {
        const input = [
            'text',
            '%% text % %%',
            '> text',
            '%% start %',
            'end %%',
            '% text %',
            '',
        ].join('\n');
        const output = [
            'text',
            '<span class="cm-comment">%\u200B% text % %\u200B%</span>',
            '> text',
            '<span class="cm-comment">%\u200B% start %',
            'end %\u200B%</span>',
            '% text %',
            '&nbsp;',
        ].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });

    test('case 5: has html comments', () => {
        const input = [
            '<!-- text -->',
            '> text',
            '<!-- start',
            'end -->',
            '% text %',
            '',
        ].join('\n');
        const output = [
            '<span class="cm-comment">&lt;!-- text --&gt;</span>',

            '> text',
            '<span class="cm-comment">&lt;!-- start\nend --&gt;</span>',
            '% text %',
            '&nbsp;',
        ].join('\n');

        const actual = formatText(input);
        expect(actual).toEqual(output);
    });

    test('bug with html comments', () => {
        const input = [
            '<!-- note: text-->',
            '« text » ([author, 2010](zotero://select/library/items/xxx))',
        ].join('\n');
        const output = [
            '<span class="cm-comment">&lt;!-- note: text--&gt;</span>',
            '« text » ([author, 2010](zotero://select/library/items/xxx))',
        ].join('\n');
        const actual = formatText(input);
        expect(actual).toEqual(output);
    });
});

describe('performance-test: format-text', () => {
    test('performance: n iterations of random markdown text', () => {
        const loremIpsumLength = 10000;

        const texts = Array.from({ length: 10 }).map(() => {
            return generateLoremIpsumWithMarkdown(loremIpsumLength);
        });
        // eslint-disable-next-line no-console
        console.log(texts.join('').length + ' characters');
        // eslint-disable-next-line no-console
        console.time('format-text');
        for (let i = 0; i < texts.length; i++) {
            formatText(texts[i]);
        }
        // eslint-disable-next-line no-console
        console.timeEnd('format-text');

        expect(false).toBe(false);
    });
});
