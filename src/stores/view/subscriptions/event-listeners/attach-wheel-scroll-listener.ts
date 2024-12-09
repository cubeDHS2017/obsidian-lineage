import { LineageView } from 'src/view/view';

export const attachWheelScrollListener = (view: LineageView) => {
    view.plugin.registerDomEvent(view.contentEl, 'wheel', (evt) => {
        if (!evt.altKey) return;
        if (evt.deltaY === 0) return;
        const target = evt.target as HTMLElement;
        const targetIsACard =
            target.hasClass('lng-prev') || target.closest('.lng-prev');
        if (!targetIsACard) return;

        const column = target.closest('.column') as HTMLElement | null;
        if (!column) return;
        evt.preventDefault();
        evt.stopPropagation();
        requestAnimationFrame(() => {
            column.scrollBy({
                top: evt.deltaY * 2.5,
                behavior: 'smooth',
            });
        });
    });
};
