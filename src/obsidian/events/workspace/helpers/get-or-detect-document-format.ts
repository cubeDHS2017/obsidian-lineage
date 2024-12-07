import { LineageView } from 'src/view/view';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { detectDocumentFormat } from 'src/lib/format-detection/detect-document-format';
import { maybeGetDocumentFormat } from 'src/obsidian/events/workspace/helpers/maybe-get-document-format';
import { outlineToJson } from 'src/lib/data-conversion/x-to-json/outline-to-json';

export const getOrDetectDocumentFormat = (
    view: LineageView,
    data: string,
): LineageDocumentFormat => {
    const format = maybeGetDocumentFormat(view);
    if (format) {
        return format;
    }

    const detected = detectDocumentFormat(view.data);
    if (detected) return detected;

    const defaultFormat =
        view.plugin.settings.getValue().general.defaultDocumentFormat;
    if (defaultFormat === 'outline') {
        if (!data.trim()) return 'outline';
        // has a single item
        try {
            const tree = outlineToJson(data);
            if (tree.length <= 1 && tree[0]?.children?.length === 0)
                return 'outline';
        } catch {
            /* empty */
        }
    }
    return defaultFormat;
};
