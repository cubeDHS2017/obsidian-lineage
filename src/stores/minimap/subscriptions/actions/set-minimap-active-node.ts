import { LineageView } from 'src/view/view';

export const setMinimapActiveNode = (view: LineageView) => {
    view.getMinimapStore().dispatch({
        type: 'minimap/set-active-node',
        payload: {
            id: view.viewStore.getValue().document.activeNode,
        },
    });
};
