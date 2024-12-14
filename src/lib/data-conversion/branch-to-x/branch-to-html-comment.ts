import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { jsonToHtmlComment } from 'src/lib/data-conversion/json-to-x/json-to-html-comment';
import { branchToJson } from 'src/lib/data-conversion/x-to-json/branch-to-json';

export const branchToHtmlComment = (branches: ClipboardBranch[]) => {
    return jsonToHtmlComment(branchToJson(branches));
};
