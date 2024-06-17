import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';

export const maybeGetDocumentFormat = (view: LineageView) => {
    invariant(view.file);
    return view.plugin.settings.getValue().documents[view.file.path]
        ?.documentFormat;
};
