import { StyleRuleTarget } from 'src/stores/settings/types/style-rules-types';
import { Column } from 'src/stores/document/document-state-type';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { traverseUp } from 'src/lib/tree-utils/get/traverse-up';
import { findChildGroup } from 'src/lib/tree-utils/find/find-child-group';
import { getAllChildren } from 'src/lib/tree-utils/get/get-all-children';

export const getTargetNodes = (
    scope: StyleRuleTarget,
    nodeId: string,
    columns: Column[],
): string[] => {
    switch (scope) {
        case 'self':
            return [nodeId];

        case 'direct-parent': {
            const group = findGroupByNodeId(columns, nodeId);
            return group ? [group.parentId] : [];
        }

        case 'any-parent':
            return traverseUp(columns, nodeId);

        case 'direct-children': {
            const childGroup = findChildGroup(columns, nodeId);
            return childGroup?.nodes ?? [];
        }

        case 'any-children': {
            return getAllChildren(columns, nodeId);
        }

        default:
            return [];
    }
};
