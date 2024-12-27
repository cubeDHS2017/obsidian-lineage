import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { processStyleRules } from 'src/stores/view/subscriptions/effects/style-rules/process-style-rules';
import { debounce } from 'obsidian';

export const updateViewStyleRules = debounce((view: LineageView) => {
    const path = view.file?.path;
    invariant(path);
    const rules = view.plugin.settings.getValue().styleRules.documents[path];
    if (rules) {
        const document = view.documentStore.getValue().document;
        const result = processStyleRules(document, rules.rules);
        view.viewStore.dispatch({
            type: 'view/style-rules/update-results',
            payload: {
                rules: result,
            },
        });
    }
}, 100);
