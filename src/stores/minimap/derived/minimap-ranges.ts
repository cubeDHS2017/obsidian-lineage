import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const MinimapRangesStore = (view: LineageView) =>
    derived(view.getMinimapStore(), (state) => state.ranges.cards);
