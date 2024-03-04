import { ViewStore } from 'src/view/view';
import { VerticalDirection } from 'src/stores/view/view-reducer';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/save-node-content';

export const mergeNode = (store: ViewStore, direction: VerticalDirection) => {
    saveNodeContent(store);
    store.dispatch({
        type: 'DOCUMENT/MERGE_NODE',
        payload: { direction },
    });
};
