import {
    ConditionNode,
    StyleRule,
} from 'src/stores/settings/types/style-rules-types';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { evaluateCondition } from 'src/stores/view/subscriptions/effects/style-rules/helpers/evaluate-condition';
import { TargetNodeResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/target-node-resolver';
import { NodePropertyResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/node-property-resolver';
import { NodeStyle } from 'src/stores/view/view-state-type';

export const processStyleRules = (doc: LineageDocument, rules: StyleRule[]) => {
    const nodeStyles = new Map<string, NodeStyle>();
    // ascending order
    const sortedRules = [...rules].sort((a, b) => a.priority - b.priority);
    const nodeResolver = new TargetNodeResolver(doc.columns);
    const propertyResolver = new NodePropertyResolver(doc.columns, doc.content);
    for (const column of doc.columns) {
        for (const group of column.groups) {
            for (const nodeId of group.nodes) {
                for (const rule of sortedRules) {
                    if (!rule.enabled) continue;

                    const match = evaluateCondition(
                        nodeId,
                        rule.condition as ConditionNode,
                        doc.content,
                        nodeResolver,
                        propertyResolver,
                    );
                    if (match) {
                        nodeStyles.set(nodeId, {
                            color: rule.color,
                        });
                        break;
                    }
                }
            }
        }
    }
    return nodeStyles;
};
