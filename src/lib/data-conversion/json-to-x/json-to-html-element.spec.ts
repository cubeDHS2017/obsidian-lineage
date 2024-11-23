import { describe, expect, it } from 'vitest';
import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { createHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/create-html-element-marker';
import { jsonToHtmlElement } from 'src/lib/data-conversion/json-to-x/json-to-html-element';
import { ginkgo_welcome } from 'src/lib/data-conversion/test-data/ginkgo_welcome';
import { ginkgo_academic_paper } from 'src/lib/data-conversion/test-data/ginkgo_acedemic_paper';
import { html_element_conflicting_elements } from 'src/lib/data-conversion/test-data/html-element-conflicting-elements';
import { htmlCommentToJson } from 'src/lib/data-conversion/x-to-json/html-comment-to-json';

describe('json to html element', () => {
    it('case 1', () => {
        const input: TreeNode[] = [
            {
                content: 'one',
                children: [{ content: 'one > one', children: [] }],
            },
        ];
        const output = [
            createHtmlElementMarker('', 1) + 'one',
            '',
            createHtmlElementMarker('1', 1) + 'one > one',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });
    it('case 1', () => {
        const input: TreeNode[] = [
            {
                content: 'one',
                children: [
                    {
                        content: 'one > one',
                        children: [
                            { content: 'one > one > one', children: [] },
                        ],
                    },
                ],
            },
            {
                content: 'two',
                children: [
                    {
                        content: 'two > one',
                        children: [
                            { content: 'two > one > one', children: [] },
                        ],
                    },
                ],
            },
        ];
        const output = [
            createHtmlElementMarker('', 1) + 'one',
            '',
            createHtmlElementMarker('1', 1) + 'one > one',
            '',
            createHtmlElementMarker('1.1', 1) + 'one > one > one',
            '',
            createHtmlElementMarker('', 2) + 'two',
            '',
            createHtmlElementMarker('2', 1) + 'two > one',
            '',
            createHtmlElementMarker('2.1', 1) + 'two > one > one',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('case: multi line text', () => {
        const input: TreeNode[] = [
            {
                content: '1a\n1b',
                children: [{ content: '1.1a\n1.1b', children: [] }],
            },
            { content: '2a\n2b', children: [] },
            { content: '3', children: [] },
        ];

        const output = [
            createHtmlElementMarker('', 1) + '1a',
            '1b',
            '',
            createHtmlElementMarker('1', 1) + '1.1a',
            '1.1b',
            '',
            createHtmlElementMarker('', 2) + '2a',
            '2b',
            '',
            createHtmlElementMarker('', 3) + '3',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('ginkgo_welcome', () => {
        const { mdWithHtmlElement, json } = ginkgo_welcome;
        const actual = jsonToHtmlElement(json);
        expect(actual).toEqual(mdWithHtmlElement);
    });

    it('ginkgo_academic_paper', () => {
        const { mdWithHtmlElement, json } = ginkgo_academic_paper;
        const actual = jsonToHtmlElement(json);

        expect(actual).toEqual(mdWithHtmlElement);
    });

    it('htmlElementConflictingElements', () => {
        const { mdWithHtmlElement, mdWithHtmlComment } =
            html_element_conflicting_elements;
        const actual = jsonToHtmlElement(htmlCommentToJson(mdWithHtmlComment));

        expect(actual).toEqual(mdWithHtmlElement);
    });
});
