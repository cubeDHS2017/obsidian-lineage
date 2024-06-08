import { LineageView } from 'src/view/view';
import { getBranch } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/get-branch';
import { branchToSection } from 'src/lib/data-conversion/branch-to-section';
import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { branchToOutline } from 'src/lib/data-conversion/branch-to-outline';

export const copyActiveBranchToClipboard = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const documentState = view.documentStore.getValue();
    const branch = getBranch(
        documentState.document.columns,
        documentState.document.content,
        viewState.document.activeNode,
        'copy',
    );

    const format = getDocumentFormat(view);
    const text =
        format === 'outline'
            ? branchToOutline(branch)
            : branchToSection(branch);
    await navigator.clipboard.writeText(text);
};
