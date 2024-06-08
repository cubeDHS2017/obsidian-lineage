import Lineage from 'src/main';
import { ViewState, WorkspaceLeaf } from 'obsidian';
import { ViewType } from 'src/stores/settings/settings-type';

export const toggleObsidianViewType = (
    plugin: Lineage,
    leaf: WorkspaceLeaf,
    type: ViewType,
) => {
    setTimeout(() => {
        leaf.setViewState({
            type,
            popstate: true,
            state: leaf.view.getState(),
        } as ViewState);
        const activeLeaf = plugin.app.workspace.getLeaf();
        if (activeLeaf !== leaf) plugin.app.workspace.revealLeaf(leaf);
    }, 0);
};
