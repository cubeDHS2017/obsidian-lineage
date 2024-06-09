import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { mapActiveBranchesToText } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/map-active-branches-to-text';
import { LineageView } from 'src/view/view';

export const copyActiveBranchesToClipboard = async (view: LineageView) => {
    const document = view.viewStore.getValue().document;
    const format = getDocumentFormat(view);
    const text = mapActiveBranchesToText(
        view.documentStore.getValue().document,
        document.activeNode,
        document.selectedNodes,
        format,
    );
    await navigator.clipboard.writeText(text);
};
