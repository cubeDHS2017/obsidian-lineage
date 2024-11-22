import { describe, expect, it } from 'vitest';
import { Column } from 'src/stores/document/document-state-type';
import {
    columnsToJson,
    TreeNode,
} from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { ginkgo_academic_paper } from 'src/lib/data-conversion/test-data/ginkgo_acedemic_paper';

const rootNodeId = 'root';

describe('columns-to-json', () => {
    it('one column', () => {
        const node1 = '1';
        const node2 = '2';
        const column1: Column = {
            id: 'c-1',
            groups: [{ nodes: [node1, node2], parentId: rootNodeId }],
        };
        const output: TreeNode[] = [
            {
                content: '',
                children: [],
            },
            {
                content: '',
                children: [],
            },
        ];
        expect(
            columnsToJson([column1], {
                node1: { content: '' },
                node2: { content: '' },
            }),
        ).toEqual(output);
    });
    it('case ', () => {
        const columns = [
            {
                id: 'c-lt8wbrx2',
                groups: [
                    {
                        parentId: 'r-lt8wbrx1',
                        nodes: ['n-lt8wbucz'],
                    },
                ],
            },
        ];
        const content = {};
        const roots = [{ content: '', children: [] }];

        expect(columnsToJson(columns, content)).toEqual(roots);
    });
    it('case', () => {
        const columns = [
            {
                id: 'c-lt8ynup5',
                groups: [
                    {
                        nodes: ['n-lt8ynup4', 'n-lt8ynup6', 'n-lt8ynz4j'],
                        parentId: 'r-lt8ynup3',
                    },
                ],
            },
            {
                id: 'c-lt8ynup8',
                groups: [
                    {
                        nodes: ['n-lt8ynup7', 'n-lt8ynup9'],
                        parentId: 'n-lt8ynup6',
                    },
                ],
            },
            {
                id: 'c-lt8ynupb',
                groups: [
                    {
                        nodes: ['n-lt8ynupa', 'n-lt8ynupc', 'n-lt8ynupd'],
                        parentId: 'n-lt8ynup9',
                    },
                ],
            },
        ];
        const content = {
            'n-lt8ynup4': { content: 'one' },
            'n-lt8ynup6': { content: 'two' },
            'n-lt8ynup7': { content: 'three' },
            'n-lt8ynup9': { content: 'four' },
            'n-lt8ynupa': { content: 'five' },
            'n-lt8ynupc': { content: 'six' },
            'n-lt8ynupd': { content: 'seven' },
            'n-lt8ynz4j': { content: 'eight' },
        };
        const roots = [
            { content: 'one', children: [] },
            {
                content: 'two',
                children: [
                    { content: 'three', children: [] },
                    {
                        content: 'four',
                        children: [
                            { content: 'five', children: [] },
                            { content: 'six', children: [] },
                            { content: 'seven', children: [] },
                        ],
                    },
                ],
            },
            { content: 'eight', children: [] },
        ];
        expect(columnsToJson(columns, content)).toEqual(roots);
    });
    it('case', () => {
        const { json, lineageDocument } = ginkgo_academic_paper;
        expect(
            columnsToJson(lineageDocument.columns, lineageDocument.content),
        ).toEqual(json);
    });
});
