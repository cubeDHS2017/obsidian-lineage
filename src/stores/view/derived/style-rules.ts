import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const NodeStylesStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.styleRules.nodeStyles);

export const AllRuleMatchesStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.styleRules.allMatches);
