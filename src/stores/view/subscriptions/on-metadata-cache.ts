import { LineageView } from 'src/view/view';
import { markUnresolvedLinks } from 'src/stores/view/subscriptions/effects/mark-unresolved-links';

export const onMetadataCache = (view: LineageView) => {
    const eventRef = view.plugin.app.metadataCache.on('changed', (file) => {
        if (file === view.file) markUnresolvedLinks(view);
    });
    return () => {
        view.plugin.app.metadataCache.offref(eventRef);
    };
};
