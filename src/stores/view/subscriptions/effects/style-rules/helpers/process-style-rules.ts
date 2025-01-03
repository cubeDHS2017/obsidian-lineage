import {
    ConditionNode,
    StyleRule,
} from 'src/stores/settings/types/style-rules-types';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { evaluateCondition } from 'src/stores/view/subscriptions/effects/style-rules/helpers/evaluate-condition';
import { TargetNodeResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/target-node-resolver';
import { NodePropertyResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/node-property-resolver';
import { NodeStyle } from 'src/stores/view/view-state-type';

export type StyleRulesResult = {
    nodeStyles: Map<string, NodeStyle>;
    allMatches: Map<string, string[]>;
};

export const processStyleRules = (
    doc: LineageDocument,
    rules: StyleRule[],
    nodeResolver: NodePropertyResolver,
    propertyResolver: TargetNodeResolver,
) => {
    const result: StyleRulesResult = {
        nodeStyles: new Map(),
        allMatches: new Map(),
    };
    // ascending order
    const sortedRules = [...rules].sort((a, b) => a.priority - b.priority);

    for (const column of doc.columns) {
        for (const group of column.groups) {
            for (const nodeId of group.nodes) {
                for (const rule of sortedRules) {
                    if (!rule.enabled) continue;
                    if (
                        typeof rule.condition.value === 'string' &&
                        rule.condition.value.length === 0
                    ) {
                        continue;
                    }
                    const match = evaluateCondition(
                        nodeId,
                        rule.condition as ConditionNode,
                        doc.content,
                        propertyResolver,
                        nodeResolver,
                    );
                    if (match) {
                        if (!result.nodeStyles.has(nodeId)) {
                            result.nodeStyles.set(nodeId, {
                                color: rule.color,
                            });
                        }
                        let ruleNodes = result.allMatches.get(rule.id);
                        if (!ruleNodes) {
                            ruleNodes = [];
                            result.allMatches.set(rule.id, ruleNodes);
                        }
                        ruleNodes.push(nodeId);
                    }
                }
            }
        }
    }
    return result;
};
