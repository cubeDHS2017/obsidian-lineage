import { debounce } from 'obsidian';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import { rulesWorker } from 'src/workers/worker-instances';
import { StyleRule } from 'src/stores/settings/types/style-rules-types';
import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { NodeStyle } from 'src/stores/view/view-state-type';

export class StyleRulesProcessor {
    private view: LineageView;
    private rules: StyleRule[] = [];

    constructor(view: LineageView) {
        this.view = view;
    }

    onViewMount = async () => {
        this.setRules();
        this.processRules(null);
    };
    onDocumentUpdate = async (action: DocumentStoreAction) => {
        this.processRules(action);
    };

    onRulesUpdate = async () => {
        this.setRules();
        this.processRules(null);
    };

    onViewUnmount = async () => {
        await rulesWorker.run({
            type: 'destroy',
            payload: {
                viewId: this.view.id,
            },
        });
        this.rules = [];
    };

    private processRules = debounce(
        async (action: DocumentStoreAction | null) => {
            let results = new Map<string, NodeStyle>();
            if (this.rules.length > 0) {
                const document = this.view.documentStore.getValue().document;

                results = (await rulesWorker.run({
                    type: 'process-rules',
                    payload: {
                        document,
                        rules: this.rules,
                        action,
                        viewId: this.view.id,
                    },
                })) as Map<string, NodeStyle>;
            }
            this.view.viewStore.dispatch({
                type: 'view/style-rules/update-results',
                payload: {
                    rules: results,
                },
            });
        },
        100,
    );

    private setRules = () => {
        const path = this.view.file?.path;
        invariant(path);
        const rules =
            this.view.plugin.settings.getValue().styleRules.documents[path];
        this.rules = rules?.rules ?? [];
    };
}
