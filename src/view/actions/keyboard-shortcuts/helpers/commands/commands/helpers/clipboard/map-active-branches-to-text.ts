import { getBranch } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/get-branch';
import { branchToSection } from 'src/lib/data-conversion/branch-to-section';
import { branchToOutline } from 'src/lib/data-conversion/branch-to-outline';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { LineageDocument } from 'src/stores/document/document-state-type';

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
        : branchToSection(branches);
};
