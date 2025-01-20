import { LineageView } from 'src/view/view';

export const enableEditModeInSidebar = (view: LineageView, nodeId: string) => {
    const settings = view.plugin.settings.getValue();
    const activeSidebarTab = settings.view.leftSidebarActiveTab;
    view.viewStore.dispatch({
        type: 'view/sidebar/enable-edit',
        payload: {
            id: nodeId,
        },
        context: {
            activeSidebarTab: activeSidebarTab,
        },
    });
};
