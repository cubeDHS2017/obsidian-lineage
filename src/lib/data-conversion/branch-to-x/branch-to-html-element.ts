import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { branchToJson } from 'src/lib/data-conversion/x-to-json/branch-to-json';
import { jsonToHtmlElement } from 'src/lib/data-conversion/json-to-x/json-to-html-element';

export const branchToHtmlElement = (branches: ClipboardBranch[]) => {
    return jsonToHtmlElement(branchToJson(branches));
};
