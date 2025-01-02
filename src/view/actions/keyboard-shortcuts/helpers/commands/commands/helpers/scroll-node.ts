import { LineageView } from 'src/view/view';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';

export const scrollNode = (view: LineageView, direction: AllDirections) => {
    const container = view.container;
    if (!container) return;
    const element = getNodeElement(
        container,
        view.viewStore.getValue().document.activeNode,
    );
    if (!element) return;
    const STEP = Math.floor(view.plugin.settings.getValue().view.cardWidth / 4);
    if (direction === 'down' || direction === 'up') {
        const column = element.matchParent('.column') as HTMLElement;
        if (!column) return;
        const scrollTop = direction === 'up' ? STEP : -STEP;
        requestAnimationFrame(() => {
            column.scrollBy({
                top: scrollTop,
                behavior: 'smooth',
            });
        });
    } else {
        const scrollLeft = direction === 'left' ? STEP : -STEP;
        requestAnimationFrame(() => {
            container.scrollBy({
                left: scrollLeft,
                behavior: 'smooth',
            });
        });
    }
};
