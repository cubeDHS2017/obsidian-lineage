import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';
import { lang } from 'src/lang/lang';
import { getActiveNodes } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/get-active-nodes';

export const copyActiveNodesToClipboard = async (
    view: LineageView,
    isInSidebar: boolean,
) => {
    const nodes = getActiveNodes(view, isInSidebar);
    const text = nodes
        .map((id) => view.documentStore.getValue().document.content[id].content)
        .join('\n\n');
    await navigator.clipboard.writeText(text);
    if (nodes.length > 1) {
        const message = lang.hk_notice_copy(nodes.length, false, 'section');
        if (message) new Notice(message);
    }
};
