import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';
import { lang } from 'src/lang/lang';

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
    if (nodes.length > 1) {
        const message = lang.hk_notice_copy(nodes.length, false, 'section');
        if (message) new Notice(message);
    }
};
