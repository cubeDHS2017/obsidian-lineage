import { LineageDocument } from 'src/stores/document/document-state-type';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { columnsToJson } from 'src/lib/data-conversion/columns-to-json';
import { jsonToSections } from 'src/lib/data-conversion/json-to-sections';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-outline';

export const stringifyDocument = (
    document: LineageDocument,
    format: LineageDocumentFormat,
) => {
    const json = columnsToJson(document.columns, document.content);
    if (format === 'outline') {
        return jsonToOutline(json);
    } else return jsonToSections(json);
};
