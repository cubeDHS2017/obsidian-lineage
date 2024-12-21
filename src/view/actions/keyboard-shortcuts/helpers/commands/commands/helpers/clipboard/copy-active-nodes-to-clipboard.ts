import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';

export const copyActiveNodesToClipboard = async (view: LineageView) => {
    const document = view.viewStore.getValue().document;
    const nodes =
        document.selectedNodes.size > 0
            ? Array.from(document.selectedNodes)
            : [document.activeNode];
    const text = nodes
        .map((id) => view.documentStore.getValue().document.content[id].content)
        .join('\n\n');
    await navigator.clipboard.writeText(text);
    new Notice(
        nodes.length > 1
            ? nodes.length + ' sections copied to clipboard'
            : 'Section copied to clipboard',
    );
};
