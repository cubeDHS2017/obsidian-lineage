import { describe, expect, test } from 'vitest';
import { StyleRule } from 'src/stores/settings/types/style-rules-types';
import { processStyleRules } from '../../process-style-rules';
import { wikipedia_cobol } from 'src/lib/data-conversion/test-data/wikipedia_cobol';
import { TargetNodeResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/target-node-resolver';
import { NodePropertyResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/node-property-resolver';

const propertyResolver = new TargetNodeResolver(
    wikipedia_cobol.columns.columns,
);
const nodeResolver = new NodePropertyResolver(
    wikipedia_cobol.columns.columns,
    wikipedia_cobol.columns.content,
);

describe('general', () => {
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

    test('should ignore rules with empty values', () => {
        const rule: StyleRule = {
            id: 'srpjP0rS0X',
            name: '',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'content',
                operator: 'contains',
                value: '',
                enabled: true,
            },
            color: '#fb7979',
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
});
