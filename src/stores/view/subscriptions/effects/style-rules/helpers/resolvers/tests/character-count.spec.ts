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

describe('character-count.self', () => {
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
        expect(result.nodeStyles.size).toBe(26);
    });
});
