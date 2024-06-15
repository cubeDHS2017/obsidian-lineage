import { LineageView } from 'src/view/view';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';
import invariant from 'tiny-invariant';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFile } from 'src/obsidian/events/workspace/effects/open-file';
import { Notice } from 'obsidian';

export const exportColumn = async (view: LineageView) => {
    const activeNode = view.viewStore.getValue().document.activeNode;
    invariant(activeNode);

    const document = view.documentStore.getValue().document;
    const columnIndex = findNodeColumn(document.columns, activeNode);
    const column = document.columns[columnIndex];
    invariant(column);

    const nodes = column.groups.map((g) => g.nodes).flat();
    const content = nodes.map((n) => document.content[n].content);
    const text = content.filter((c) => c.trim().length > 0).join('\n\n');

    if (!text.trim()) {
        new Notice('This column is empty');
        return;
    }

    const file = view.file;
    invariant(file);
    invariant(file.parent);
    const newFile = await createNewFile(
        view.plugin,
        file.parent,
        text,
        `${file.basename} - column ${columnIndex + 1}`,
    );
    await openFile(view.plugin, newFile, 'split');
};
