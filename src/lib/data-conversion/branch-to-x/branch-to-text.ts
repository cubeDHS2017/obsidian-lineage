import { jsonToText } from 'src/lib/data-conversion/json-to-x/json-to-text';
import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { branchToJson } from 'src/lib/data-conversion/x-to-json/branch-to-json';

export const branchToText = (branches: ClipboardBranch[]) => {
    return jsonToText(branchToJson(branches));
};
