import { Column, Content } from 'src/stores/document/document-state-type';
import { getDirectChildrenCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-direct-children-count';
import { getLineCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-line-count';
import { getWordCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-word-count';
import { getCharacterCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-character-count';
import { getTotalChildrenCount } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-total-children-count';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import {
    NumericProperty,
    StringProperty,
} from 'src/stores/settings/types/style-rules-types';
import { getHeadings } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/helpers/get-headings';

type Property = NumericProperty | StringProperty;
type Cache = {
    [nodeId: string]: {
        [key in Property]?: number | string;
    };
};

export class NodePropertyResolver {
    private columns: Column[];
    private content: Content;
    private cache: Cache;

    constructor(columns: Column[], content: Content) {
        this.columns = columns;
        this.content = content;
        this.cache = {};
    }

    private cacheResult(
        nodeId: string,
        property: Property,
        value: number | string,
    ): void {
        if (!this.cache[nodeId]) {
            this.cache[nodeId] = {};
        }
        this.cache[nodeId][property] = value;
    }

    public getProperty(nodeId: string, property: Property) {
        if (this.cache[nodeId]?.[property] !== undefined) {
            return this.cache[nodeId][property] as number | string;
        }

        let value: number | string;

        switch (property) {
            case 'direct-children-count':
                value = getDirectChildrenCount(this.columns, nodeId);
                break;

            case 'total-children-count':
                value = getTotalChildrenCount(this.columns, nodeId);
                break;

            case 'line-count':
                value = getLineCount(this.content[nodeId]?.content);
                break;

            case 'word-count':
                value = getWordCount(this.content[nodeId]?.content);
                break;

            case 'character-count':
                value = getCharacterCount(this.content[nodeId]?.content);
                break;

            case 'depth':
                value = findNodeColumn(this.columns, nodeId) + 1;
                break;
            case 'headings':
                value = getHeadings(this.content[nodeId]?.content)
                    .join(' ')
                    .toLowerCase();
                break;
            case 'headings-word-count':
                value = getWordCount(
                    this.getProperty(nodeId, 'headings') as string,
                );

                break;
            default:
                throw new Error(`Unsupported property: ${property}`);
        }

        this.cacheResult(nodeId, property, value);
        return value;
    }
}
