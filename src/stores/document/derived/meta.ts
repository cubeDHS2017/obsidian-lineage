import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const GroupParentIdsStore = (view: LineageView) => {
    return derived(view.documentStore, (state) => {
        return state.meta.groupParentIds;
    });
};
