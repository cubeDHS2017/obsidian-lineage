import { LineageView } from 'src/view/view';

export const selectInactiveCard = (
    view: LineageView,
    closestCardElement: HTMLElement,
    isInSidebar: boolean,
    isInRecentCardsList: boolean,
) => {
    const id = closestCardElement?.id;
    if (!isInSidebar) {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id,
            },
            // to prevent scrolling
            context: { modKey: true },
        });
    } else if (isInRecentCardsList) {
        view.viewStore.dispatch({
            type: 'view/recent-nodes/set-active-node',
            payload: {
                id,
            },
        });
    } else {
        view.viewStore.dispatch({
            type: 'view/pinned-nodes/set-active-node',
            payload: {
                id,
            },
        });
    }
};
