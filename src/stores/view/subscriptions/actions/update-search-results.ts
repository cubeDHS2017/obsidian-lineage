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
            type: 'view/set-active-node/search',
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
    const search = view.documentSearch.search(query);
    const results = search.map((r) => r.item.id);
    view.viewStore.dispatch({
        type: 'SEARCH/SET_RESULTS',
        payload: {
            results: results,
        },
    });
    // needed in cases where the structure of the document is updated while showing search results (dnd/moving branches)
    // in these cases, unless search results have changed, active node should be maintained
    const newSearchResults = Array.from(results).sort().join('');
    const previousSearchResults = Array.from(viewState.search.results)
        .sort()
        .join('');
    if (previousSearchResults !== newSearchResults) {
        updateActiveNodeAfterSearch(view, search);
    }
};
