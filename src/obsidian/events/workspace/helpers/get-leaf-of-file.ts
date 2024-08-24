import Lineage from 'src/main';
import { MarkdownView, TFile } from 'obsidian';
import { LINEAGE_VIEW_TYPE } from 'src/view/view';

export const getLeafOfFile = (
    plugin: Lineage,
    file: TFile,
    viewType: 'markdown' | typeof LINEAGE_VIEW_TYPE,
) => {
    const leaves = plugin.app.workspace.getLeavesOfType(viewType);
    return leaves.find(
        (l) => (l.view as MarkdownView)?.file?.path === file.path,
    );
};
