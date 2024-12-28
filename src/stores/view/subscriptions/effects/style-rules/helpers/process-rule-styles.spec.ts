import { describe, expect, test } from 'vitest';
import { StyleRule } from 'src/stores/settings/types/style-rules-types';
import { processStyleRules } from 'src/stores/view/subscriptions/effects/style-rules/helpers/process-style-rules';
import { wikipedia_cobol } from 'src/lib/data-conversion/test-data/wikipedia_cobol';
import { TargetNodeResolver } from './resolvers/target-node-resolver';
import { NodePropertyResolver } from './resolvers/node-property-resolver/node-property-resolver';

describe('Style Rules', () => {
    const style_1 = { color: '#000000' };

    const propertyResolver = new TargetNodeResolver(
        wikipedia_cobol.columns.columns,
    );
    const nodeResolver = new NodePropertyResolver(
        wikipedia_cobol.columns.columns,
        wikipedia_cobol.columns.content,
    );
    test('content of self contains "cobol"', () => {
        const rule: StyleRule = {
            id: 'sryyvpECiF',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'content',
                operator: 'contains',
                value: 'COBOL',
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(29);
        expect(result.get('nMasFNiYv')).toEqual(style_1);
    });

    test('content of direct children contains "legacy"', () => {
        const rule: StyleRule = {
            id: 'sr8bLJytbF',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'direct-children',
                property: 'content',
                operator: 'contains',
                value: 'legacy',
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(5);
        expect(Array.from(result.values())).toEqual([
            style_1,
            style_1,
            style_1,
            style_1,
            style_1,
        ]);
    });

    test('any children.content content legacy', () => {
        const rule: StyleRule = {
            id: 'sr8bLJytbF',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'any-children',
                property: 'content',
                operator: 'contains',
                value: 'legacy',
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(6);
        expect(Array.from(result.values())).toEqual([
            style_1,
            style_1,
            style_1,
            style_1,
            style_1,
            style_1,
        ]);
    });

    test('word count of node is between 2 and 5', () => {
        const rule: StyleRule = {
            id: 'sr-5UR6G6b',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'word-count',
                operator: 'between',
                value: 2,
                valueB: 3,
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(5);
    });

    test('word count of node headings is between 2 and 5', () => {
        const rule: StyleRule = {
            id: 'sr-5UR6G6b',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'headings-word-count',
                operator: 'between',
                value: 2,
                valueB: 3,
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(23);
    });
    test('depth greater than', () => {
        const rule: StyleRule = {
            id: 'srX_voIZrM',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'depth',
                operator: 'greater-than',
                value: 3,
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(5);
    });

    test('character count of card greater than 50', () => {
        const rule: StyleRule = {
            id: 'srtCp4e4qU',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'character-count',
                operator: 'greater-than',
                value: 50,
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(26);
    });

    test('direct children count > 3', () => {
        const rule: StyleRule = {
            id: 'srSRzA_S9V',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'direct-children-count',
                operator: 'greater-than',
                value: 3,
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(3);
    });

    test('any parent contains language', () => {
        const rule: StyleRule = {
            id: 'test-rule',
            name: 'Test Rule',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'any-parent',
                property: 'content',
                operator: 'contains',
                value: 'language',
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(8);
    });

    test('rule priority', () => {
        const rules: StyleRule[] = [
            {
                id: 'sr9cLJytbF',
                name: 'High Priority',
                enabled: true,
                condition: {
                    type: 'condition',
                    scope: 'self',
                    property: 'content',
                    operator: 'contains',
                    value: 'COBOL',
                    enabled: true,
                },
                color: '#111111',
                priority: 0,
            },
            {
                id: 'srabLJytbD',
                name: 'L Priority',
                enabled: true,
                condition: {
                    type: 'condition',
                    scope: 'self',
                    property: 'content',
                    operator: 'contains',
                    value: 'COBOL',
                    enabled: true,
                },
                color: '#222222',
                priority: 1,
            },
        ];

        const result = processStyleRules(
            wikipedia_cobol.columns,
            rules,
            nodeResolver,
            propertyResolver,
        );
        expect(result.get('nztGACkf5')).toEqual({ color: '#111111' });
    });

    test('disabled rules are ignored', () => {
        const rule: StyleRule = {
            id: 'srnbLJytbF',
            name: 'Test Rule',
            enabled: false,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'content',
                operator: 'contains',
                value: 'COBOL',
                enabled: true,
            },
            color: '#000000',
            priority: 0,
        };

        const result = processStyleRules(
            wikipedia_cobol.columns,
            [rule],
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(0);
    });

    test('depth is between', () => {
        const rules = [
            {
                id: 'srQWt9H--c',
                name: '',
                enabled: true,
                condition: {
                    type: 'condition',
                    scope: 'self',
                    property: 'depth',
                    operator: 'between',
                    value: 1,
                    enabled: true,
                    valueB: 3,
                },
                color: '#fafafa',
                priority: 0,
            },
        ] satisfies StyleRule[];

        const result = processStyleRules(
            wikipedia_cobol.columns,
            rules,
            nodeResolver,
            propertyResolver,
        );
        expect(result.size).toBe(30);
    });
});
