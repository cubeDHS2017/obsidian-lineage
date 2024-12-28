import { debounce } from 'obsidian';
import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { TargetNodeResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/target-node-resolver';
import { NodePropertyResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/node-property-resolver';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import { NodeStyle } from 'src/stores/view/view-state-type';
import { processStyleRules } from './helpers/process-style-rules';

export class StyleRulesProcessor {
    private propertyResolver: NodePropertyResolver;
    private targetResolver: TargetNodeResolver;
    constructor(private view: LineageView) {
        this.propertyResolver = new NodePropertyResolver([], {});
        this.targetResolver = new TargetNodeResolver([]);
    }

    initialize = () => {
        const document = this.view.documentStore.getValue().document;
        this.targetResolver = new TargetNodeResolver(document.columns);
        this.propertyResolver = new NodePropertyResolver(
            document.columns,
            document.content,
        );
        this.processRules();
    };
    handleDocumentUpdate = (action: DocumentStoreAction) => {
        this.resetResolversCache(action);
        this.processRules();
    };
    handleRulesUpdate = () => {
        this.processRules();
    };
    private processRules = debounce(() => {
        const path = this.view.file?.path;
        invariant(path);
        const rules =
            this.view.plugin.settings.getValue().styleRules.documents[path];
        let results = new Map<string, NodeStyle>();
        if (rules) {
            const document = this.view.documentStore.getValue().document;
            results = processStyleRules(
                document,
                rules.rules,
                this.propertyResolver,
                this.targetResolver,
            );
        }
        this.view.viewStore.dispatch({
            type: 'view/style-rules/update-results',
            payload: {
                rules: results,
            },
        });
    }, 100);

    private resetResolversCache = (action: DocumentStoreAction) => {
        this.propertyResolver.resetCache(action);
        this.targetResolver.resetCache(action);
    };
}
