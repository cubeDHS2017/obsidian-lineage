import { describe, expect, test } from 'vitest';
import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-x/json-to-outline';

describe('json-to-outline', () => {
    test('generic case', () => {
        const input: TreeNode[] = [
            {
                content: '1',
                children: [
                    {
                        content: '1.1',
                        children: [
                            { content: '1.1.1', children: [] },
                            { content: '1.1.2', children: [] },
                        ],
                    },
                    {
                        content: '1.2',
                        children: [{ content: '1.2.1', children: [] }],
                    },
                ],
            },
            {
                content: '2',
                children: [
                    {
                        content: '2.1',
                        children: [
                            { content: '2.1.1', children: [] },
                            {
                                content: '2.1.2',
                                children: [
                                    { content: '2.1.2.1', children: [] },
                                ],
                            },
                        ],
                    },
                    {
                        content: '2.2',
                        children: [
                            { content: '2.2.1', children: [] },
                            { content: '2.2.2', children: [] },
                        ],
                    },
                ],
            },
        ];

        const output = `- 1
\t- 1.1
\t\t- 1.1.1
\t\t- 1.1.2
\t- 1.2
\t\t- 1.2.1
- 2
\t- 2.1
\t\t- 2.1.1
\t\t- 2.1.2
\t\t\t- 2.1.2.1
\t- 2.2
\t\t- 2.2.1
\t\t- 2.2.2`;
        expect(jsonToOutline(input)).toEqual(output);
    });
    test('should format newline', () => {
        const input: TreeNode[] = [
            {
                content: '1',
                children: [
                    {
                        content: '1.1\n...',
                        children: [
                            { content: '1.1.1', children: [] },
                            { content: '1.1.2\n...', children: [] },
                        ],
                    },
                    {
                        content: '1.2\n...\n...',
                        children: [{ content: '1.2.1', children: [] }],
                    },
                ],
            },
        ];

        const output = `- 1
\t- 1.1
\t  ...
\t\t- 1.1.1
\t\t- 1.1.2
\t\t  ...
\t- 1.2
\t  ...
\t  ...
\t\t- 1.2.1`;
        expect(jsonToOutline(input)).toEqual(output);
    });
});
