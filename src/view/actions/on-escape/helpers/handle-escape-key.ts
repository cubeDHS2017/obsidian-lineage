import { LineageView } from 'src/view/view';

export const handleEscapeKey = (view: LineageView) => {
    const viewStore = view.viewStore;
    const value = viewStore.getValue();
    const search = value.search;
    const controls = value.ui.controls;
    const selection = value.document.selectedNodes;
    if (search.query) {
        viewStore.dispatch({
            type: 'SEARCH/SET_QUERY',
            payload: {
                query: '',
            },
        });
        return true;
    } else if (search.showInput) {
        viewStore.dispatch({
            type: 'SEARCH/TOGGLE_INPUT',
        });
        return true;
    } else if (
        controls.showHelpSidebar ||
        controls.showHistorySidebar ||
        controls.showSettingsSidebar
    ) {
        viewStore.dispatch({
            type: 'CLOSE_MODALS',
            payload: {
                closeAllModals: true,
            },
        });
        return true;
    } else if (selection.size > 1) {
        viewStore.dispatch({
            type: 'DOCUMENT/CLEAR_SELECTION',
        });
        return true;
    }
};
