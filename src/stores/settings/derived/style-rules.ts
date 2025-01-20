import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const DocumentStyleRulesStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => {
        if (!view.file?.path) return [];
        return state.styleRules.documents[view.file.path]?.rules || [];
    });
