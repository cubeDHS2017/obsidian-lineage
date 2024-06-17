import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';

export const getDocumentFormat = (view: LineageView): LineageDocumentFormat => {
    invariant(view.file);
    const format =
        view.plugin.settings.getValue().documents[view.file.path]
            ?.documentFormat;

    invariant(format);
    return format;
};
