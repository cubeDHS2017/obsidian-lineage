import { MarkdownView, TFile } from 'obsidian';
import Lineage from 'src/main';
import { setViewType } from 'src/obsidian/events/workspace/actions/set-view-type';

export const openFileAndJumpToLine = async (
    plugin: Lineage,
    file: TFile,
    line: number,
    ch: number,
) => {
    const leaf = plugin.app.workspace.getLeaf('split');
    setViewType(plugin, file.path, 'markdown');
    await leaf.openFile(file);
    const markdownView = leaf.view as MarkdownView;
    markdownView.editor.setCursor({ line, ch });
    setViewType(plugin, file.path, 'lineage');
};
