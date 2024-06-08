import Lineage from 'src/main';
import { MarkdownView } from 'obsidian';
import { LineageView } from 'src/view/view';

export const getActiveFile = (plugin: Lineage) => {
    return (
        plugin.app.workspace.getActiveViewOfType(MarkdownView)?.file ||
        plugin.app.workspace.getActiveViewOfType(LineageView)?.file
    );
};
