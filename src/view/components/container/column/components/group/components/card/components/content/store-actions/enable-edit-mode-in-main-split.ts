import { LineageView } from 'src/view/view';

export const enableEditModeInMainSplit = (
    view: LineageView,
    nodeId: string,
) => {
    view.viewStore.dispatch({
        type: 'view/main/enable-edit',
        payload: {
            nodeId,
        },
    });
};
