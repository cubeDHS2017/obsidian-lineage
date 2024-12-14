import { LineageDocument } from 'src/stores/document/document-state-type';
import { jsonToHtmlComment } from 'src/lib/data-conversion/json-to-x/json-to-html-comment';
import { columnsToJson } from 'src/lib/data-conversion/x-to-json/columns-to-json';

export const text = (document: LineageDocument) =>
    jsonToHtmlComment(columnsToJson(document.columns, document.content));
