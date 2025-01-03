import { Column } from 'src/stores/document/document-state-type';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignInactiveColumn = (
    column: Column,
    container: HTMLElement,
    zoomLevel: number,
    behavior?: ScrollBehavior,
) => {
    const nodes = column.groups.map((g) => g.nodes).flat();
    if (nodes.length <= 0) return;

    const lastNodeElement = getNodeElement(container, nodes[nodes.length - 1]);
    if (!lastNodeElement) return;
    alignElementVertically(
        container,
        lastNodeElement,
        zoomLevel,
        true,
        behavior,
    );
};
