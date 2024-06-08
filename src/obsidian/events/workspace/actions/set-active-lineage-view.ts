import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';

export const setActiveLineageView = (view: LineageView) => {
    invariant(view.file);
    view.plugin.documents.dispatch({
        type: 'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW',
        payload: {
            path: view.file?.path,
            viewId: view.id,
        },
    });
};
