import Lineage from 'src/main';
import { onWorkspaceResize } from 'src/obsidian/events/workspace/actions/on-workspace-resize';

export const registerWorkspaceResize = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on('resize', () => {
            onWorkspaceResize(plugin);
        }),
    );
};
