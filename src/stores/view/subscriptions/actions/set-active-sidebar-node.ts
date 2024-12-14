import { LineageView } from 'src/view/view';

export const setActiveSidebarNode = (view: LineageView, id: string) => {
    const settings = view.plugin.settings.getValue();
    const activeTab = settings.view.leftSidebarActiveTab;
    view.viewStore.dispatch({
        type:
            activeTab === 'pinned-cards'
                ? 'view/pinned-nodes/set-active-node'
                : 'view/recent-nodes/set-active-node',
        payload: { id },
    });
};
