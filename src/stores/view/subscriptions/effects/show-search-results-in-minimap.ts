import { LineageView } from 'src/view/view';

export const showSearchResultsInMinimap = (view: LineageView) => {
    const viewStore = view.viewStore;
    const viewState = viewStore.getValue();
    const settingsStore = view.plugin.settings;
    const settingsState = settingsStore.getValue();
    if (settingsState.view.showMinimap) {
        view.minimapStore.setSearchResults(
            Array.from(viewState.search.results),
        );
    } else {
        if (viewState.search.results.size > 0) {
            settingsStore.dispatch({ type: 'VIEW/TOGGLE_MINIMAP' });
        }
    }
};
