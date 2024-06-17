import Lineage from 'src/main';
import { LineageView } from 'src/view/view';
import { setActiveLineageView } from 'src/obsidian/events/workspace/actions/set-active-lineage-view';
import { setActiveLeafChanged } from 'src/obsidian/events/workspace/actions/set-active-leaf-changed';

export const registerActiveLeafChange = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on('active-leaf-change', (leaf) => {
            if (leaf?.view instanceof LineageView && leaf.view.file?.path) {
                setActiveLineageView(leaf.view);
            }
            setActiveLeafChanged(plugin);
        }),
    );
};
