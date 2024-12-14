import { LineageView } from 'src/view/view';
import { FuseResult } from 'fuse.js';

const updateActiveNodeAfterSearch = (
    view: LineageView,
    results: FuseResult<{ id: string; content: string }>[],
) => {
    const shouldUpdateActiveNode =
        results.length > 0 &&
        !results.find(
            (r) => r.item.id === view.viewStore.getValue().document.activeNode,
        );
    if (shouldUpdateActiveNode) {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id: results[0].item.id,
            },
        });
    }
};

export const updateSearchResults = (view: LineageView) => {
    const viewState = view.viewStore.getValue();

    const query = viewState.search.query;
    if (!query) return;
    const results = view.documentSearch.search(query);
    view.viewStore.dispatch({
        type: 'SEARCH/SET_RESULTS',
        payload: {
            results: results.map((r) => r.item.id),
        },
    });

    updateActiveNodeAfterSearch(view, results);
};
