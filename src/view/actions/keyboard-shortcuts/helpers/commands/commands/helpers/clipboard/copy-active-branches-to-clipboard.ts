import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { mapBranchesToText } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/map-branches-to-text';
import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';

const createNoticeMessage = (branches: number, formatted: boolean) => {
    return branches > 1
        ? formatted
            ? `${branches} branches copied to clipboard`
            : `${branches} unformatted branches copied to clipboard`
        : formatted
          ? 'Branch copied to clipboard'
          : 'Unformatted branch copied to clipboard';
};

export const copyActiveBranchesToClipboard = async (
    view: LineageView,
    formatted: boolean,
) => {
    const document = view.viewStore.getValue().document;
    const nodes =
        document.selectedNodes.size > 0
            ? Array.from(document.selectedNodes)
            : [document.activeNode];
    const text = mapBranchesToText(
        view.documentStore.getValue().document,
        nodes,
        formatted ? getDocumentFormat(view) : 'unformatted-text',
    );
    await navigator.clipboard.writeText(text);
    new Notice(createNoticeMessage(nodes.length, formatted));
};
