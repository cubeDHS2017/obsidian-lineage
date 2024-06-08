import { LineageView } from 'src/view/view';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { detectDocumentFormat } from 'src/lib/data-conversion/detect-document-format';
import { maybeGetDocumentFormat } from 'src/obsidian/events/workspace/helpers/maybe-get-document-format';

export const getOrDetectDocumentFormat = (
    view: LineageView,
): LineageDocumentFormat => {
    const format = maybeGetDocumentFormat(view);
    if (format) {
        return format;
    } else {
        const detected = detectDocumentFormat(view.data);
        return detected || 'document';
    }
};
