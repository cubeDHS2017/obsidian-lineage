import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { mapBranchesToText } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/map-branches-to-text';
import { LineageView } from 'src/view/view';

export const copyActiveBranchesToClipboard = async (
    view: LineageView,
    formatted: boolean,
) => {
    const document = view.viewStore.getValue().document;
    const text = mapBranchesToText(
        view.documentStore.getValue().document,
        document.selectedNodes.size > 0
            ? Array.from(document.selectedNodes)
            : [document.activeNode],
        formatted ? getDocumentFormat(view) : 'unformatted-text',
    );
    await navigator.clipboard.writeText(text);
};
