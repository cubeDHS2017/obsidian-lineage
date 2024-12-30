import { Column } from 'src/stores/document/document-state-type';
import { alignElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { Settings } from 'src/stores/settings/settings-type';

export const alignInactiveColumn = (
    column: Column,
    container: HTMLElement,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    const nodes = column.groups.map((g) => g.nodes).flat();
    if (nodes.length > 0) {
        const element = getNodeElement(container, nodes[nodes.length - 1]);
        if (element)
            alignElement(
                container,
                element,
                behavior,
                'vertical',
                settings.view.scrolling,
                settings.view.zoomLevel,
            );
    }
};
