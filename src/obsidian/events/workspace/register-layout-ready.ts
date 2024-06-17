import Lineage from 'src/main';
import { setWorkspaceLayoutReady } from 'src/obsidian/events/workspace/actions/set-workspace-layout-ready';

export const registerLayoutReady = (plugin: Lineage) => {
    plugin.app.workspace.onLayoutReady(() => {
        setWorkspaceLayoutReady(plugin);
    });
};
