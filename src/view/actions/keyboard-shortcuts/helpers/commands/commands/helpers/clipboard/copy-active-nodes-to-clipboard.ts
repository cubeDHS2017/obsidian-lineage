import { LineageView } from 'src/view/view';

export const copyActiveNodesToClipboard = async (view: LineageView) => {
    const document = view.viewStore.getValue().document;
    const nodes =
        document.selectedNodes.size > 0
            ? Array.from(document.selectedNodes)
            : [document.activeNode];
    const text = nodes
        .map((id) => view.documentStore.getValue().document.content[id].content)
        .join('\n');
    await navigator.clipboard.writeText(text);
};
