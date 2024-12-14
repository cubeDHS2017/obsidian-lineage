import { LineageView } from 'src/view/view';

export const setActivePinnedNode = (view: LineageView, id: string) => {
    view.viewStore.dispatch({
        type: 'view/pinned-nodes/set-active-node',
        payload: { id },
    });
};
