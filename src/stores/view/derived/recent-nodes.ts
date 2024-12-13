import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ActiveRecentNodeStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.recentNodes.activeNode);
