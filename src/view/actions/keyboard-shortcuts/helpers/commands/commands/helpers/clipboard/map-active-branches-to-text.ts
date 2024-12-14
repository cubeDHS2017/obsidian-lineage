import { getBranch } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/get-branch';
import { branchToHtmlComment } from 'src/lib/data-conversion/branch-to-x/branch-to-html-comment';
import { branchToOutline } from 'src/lib/data-conversion/branch-to-x/branch-to-outline';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { branchToHtmlElement } from 'src/lib/data-conversion/branch-to-x/branch-to-html-element';

export const mapActiveBranchesToText = (
    document: LineageDocument,
    activeNode: string,
    selectedNodes: Set<string>,
    format: LineageDocumentFormat,
) => {
    const isSelection = selectedNodes.size > 1;

    const nodes = isSelection ? [...selectedNodes] : [activeNode];

    const branches = nodes.map((node) =>
        getBranch(document.columns, document.content, node, 'copy'),
    );

    return format === 'outline'
        ? branchToOutline(branches)
        : format === 'html-element'
          ? branchToHtmlElement(branches)
          : branchToHtmlComment(branches);
};
