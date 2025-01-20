import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ConflictingHotkeys = (view: LineageView) =>
    derived(view.viewStore, (state) => state.hotkeys.conflictingHotkeys);

export const HotkeysSearchTerm = (view: LineageView) =>
    derived(view.viewStore, (state) => state.hotkeys.searchTerm);
