import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ScrollSettingsStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => state.view.scrolling);

export const showMinimapStore = (view: LineageView) =>
    derived(view.plugin.settings, (state) => state.view.showMinimap);
