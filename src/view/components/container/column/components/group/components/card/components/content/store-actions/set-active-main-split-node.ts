import { LineageView } from 'src/view/view';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

export const setActiveMainSplitNode = (
    view: LineageView,
    nodeId: string,
    e: MouseEvent,
) => {
    view.viewStore.dispatch({
        type: 'DOCUMENT/SET_ACTIVE_NODE',
        payload: { id: nodeId },
        context: {
            modKey: isMacLike ? e.metaKey : e.ctrlKey,
            source: 'mouse',
        },
    });
};
