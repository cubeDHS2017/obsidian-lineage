import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ActivePinnedCardStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.pinnedNodes.activeNode);
