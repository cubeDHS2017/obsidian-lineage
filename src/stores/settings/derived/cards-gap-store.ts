import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const CardsGapStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => state.view.cardsGap);
