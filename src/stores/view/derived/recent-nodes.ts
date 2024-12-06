import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';
import { removeDuplicatesFromArray } from 'src/helpers/remove-duplicates-from-array';

const RECENT_NODES_LIMIT = 30;

export const ActiveRecentNodeStore = (view: LineageView) =>
    derived(view.viewStore, (state) => state.recentNodes.activeNode);

export const RecentNodesStore = (view: LineageView) =>
    derived(view.viewStore, (state) => {
        const items = [...state.navigationHistory.items];
        if (items.length > RECENT_NODES_LIMIT) {
            const itemsToRemove = items.length - RECENT_NODES_LIMIT + 1;
            items.splice(0, itemsToRemove);
        }
        return removeDuplicatesFromArray(items, true);
    });
