import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';

export const setClientHeight = (view: LineageView) => {
    /* dom height of inactive views is 0*/
    const activeView =
        view.plugin.app.workspace.getActiveViewOfType(LineageView);
    if (!activeView) return;
    const minimapContainer =
        activeView.getMinimapDom().scrollIndicator.parentElement;
    invariant(minimapContainer);

    const containerHeight = minimapContainer.clientHeight;
    view.getMinimapStore().dispatch({
        type: 'minimap/set-container-height',
        payload: { height_cpx: dpx_to_cpx(containerHeight) },
    });
};
