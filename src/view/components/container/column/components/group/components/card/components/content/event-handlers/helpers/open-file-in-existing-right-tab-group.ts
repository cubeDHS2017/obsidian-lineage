import { LineageView } from 'src/view/view';
import { getExistingRightTabGroup } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/helpers/get-existing-right-tab-group';
import { WorkspaceLeaf } from 'obsidian';

export const openFileInExistingRightTabGroup = (
    view: LineageView,
    link: string,
    activeFilePath: string,
): boolean => {
    const rightTabGroup = getExistingRightTabGroup(view);
    if (!rightTabGroup) return false;
    const workspace = view.plugin.app.workspace;
    if (
        !(
            'createLeafInTabGroup' in workspace &&
            typeof workspace.createLeafInTabGroup === 'function'
        )
    )
        return false;
    const newLeaf = workspace.createLeafInTabGroup(
        rightTabGroup,
    ) as WorkspaceLeaf | null;
    if (newLeaf) {
        const linkedFile = view.plugin.app.metadataCache.getFirstLinkpathDest(
            link,
            activeFilePath,
        );
        if (linkedFile) {
            newLeaf.openFile(linkedFile);
            workspace.setActiveLeaf(newLeaf);
            return true;
        }
    }
    return false;
};
