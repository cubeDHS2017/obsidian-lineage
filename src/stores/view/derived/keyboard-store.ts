import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const KeyboardStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.keyboard);
