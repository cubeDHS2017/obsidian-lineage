import { StyleRuleTarget } from 'src/stores/settings/types/style-rules-types';
import { Column } from 'src/stores/document/document-state-type';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import { traverseUp } from 'src/lib/tree-utils/get/traverse-up';
import { findChildGroup } from 'src/lib/tree-utils/find/find-child-group';
import { getAllChildren } from 'src/lib/tree-utils/get/get-all-children';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    STRUCTURE_AND_CONTENT,
    STRUCTURE_ONLY,
} from 'src/stores/view/helpers/get-document-event-type';

const defaultCache = () => ({
    self: {},
    'direct-parent': {},
    'any-parent': {},
    'direct-children': {},
    'any-children': {},
});

type Cache = {
    [scope in StyleRuleTarget]: {
        [nodeId: string]: string[];
    };
};

export class TargetNodeResolver {
    private columns: Column[];
    private cache: Cache;

    constructor(columns: Column[]) {
        this.columns = columns;
        this.cache = defaultCache();
    }

    private cacheResult(
        nodeId: string,
        scope: StyleRuleTarget,
        result: string[],
    ): void {
        this.cache[scope][nodeId] = result;
    }

    public getTargetNodes(scope: StyleRuleTarget, nodeId: string): string[] {
        if (this.cache[scope][nodeId] !== undefined) {
            return this.cache[scope][nodeId]!;
        }

        let result: string[];

        switch (scope) {
            case 'self':
                result = [nodeId];
                break;

            case 'direct-parent': {
                const group = findGroupByNodeId(this.columns, nodeId);
                result = group ? [group.parentId] : [];
                break;
            }

            case 'any-parent':
                result = traverseUp(this.columns, nodeId);
                break;

            case 'direct-children': {
                const childGroup = findChildGroup(this.columns, nodeId);
                result = childGroup?.nodes ?? [];
                break;
            }

            case 'any-children':
                result = getAllChildren(this.columns, nodeId);
                break;

            default:
                result = [];
        }

        this.cacheResult(nodeId, scope, result);
        return result;
    }

    resetCache = (action: DocumentStoreAction) => {
        if (
            STRUCTURE_AND_CONTENT.has(action.type) ||
            STRUCTURE_ONLY.has(action.type)
        ) {
            this.cache = defaultCache();
        }
    };
}
