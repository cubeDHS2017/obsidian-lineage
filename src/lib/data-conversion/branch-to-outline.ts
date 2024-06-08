import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { branchToJson } from 'src/lib/data-conversion/branch-to-section';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-outline';

export const branchToOutline = (branch: ClipboardBranch) => {
    return jsonToOutline(branchToJson(branch));
};
