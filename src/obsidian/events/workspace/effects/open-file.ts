import { TFile } from 'obsidian';
import Lineage from 'src/main';

export const openFile = async (
    plugin: Lineage,
    file: TFile,
    newLeaf: 'split' | 'tab',
) => {
    const leaf = plugin.app.workspace.getLeaf(newLeaf);
    await leaf.openFile(file);
    return leaf;
};
