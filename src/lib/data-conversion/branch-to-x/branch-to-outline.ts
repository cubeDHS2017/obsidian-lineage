import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { branchToJson } from 'src/lib/data-conversion/x-to-json/branch-to-json';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-x/json-to-outline';

export const branchToOutline = (branches: ClipboardBranch[]) => {
    return jsonToOutline(branchToJson(branches));
};
