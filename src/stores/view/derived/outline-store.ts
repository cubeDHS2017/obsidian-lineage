import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const OutlineStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.outline);
