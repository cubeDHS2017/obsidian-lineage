import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const MatchingStyleRulesStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.styleRules.rules);
