import { LineageView } from 'src/view/view';

export const showSearchResultsInMinimap = (view: LineageView) => {
    const viewStore = view.viewStore;
    const viewState = viewStore.getValue();
    const settingsStore = view.plugin.settings;
    const settingsState = settingsStore.getValue();
    if (viewState.search.showInput) {
        if (!settingsState.view.showMinimap) {
            if (viewState.search.results.size > 0) {
                settingsStore.dispatch({ type: 'VIEW/TOGGLE_MINIMAP' });
                view.documentSearch.searchTriggeredMinimap = true;
            }
        }
    } else if (view.documentSearch.searchTriggeredMinimap) {
        if (settingsState.view.showMinimap) {
            settingsStore.dispatch({ type: 'VIEW/TOGGLE_MINIMAP' });
        }
        view.documentSearch.searchTriggeredMinimap = false;
    }
};
