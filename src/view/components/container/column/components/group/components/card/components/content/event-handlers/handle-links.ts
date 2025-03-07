import { LineageView } from 'src/view/view';
import { openFileInNewSplit } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/open-file-in-new-split';

const selectCard = (view: LineageView, id: string) => {
    view.viewStore.dispatch({
        type: 'view/set-active-node/mouse',
        payload: {
            id: id,
        },
    });
};

const handleHeading = (view: LineageView, link: string) => {
    const levelMatch = /(#+)/.exec(link);
    if (levelMatch) {
        for (let level = 1; level <= 6; level++) {
            const headings = Array.from(
                view.containerEl.querySelectorAll('h' + level),
            ) as HTMLHeadingElement[];
            const heading = headings.find(
                (h) => '#' + h.dataset.heading === link,
            );
            if (heading) {
                const card = heading.closest('.lineage-card');
                if (card && card.id) {
                    selectCard(view, card.id);
                    break;
                }
            }
        }
    }
};

const handleBlockLink = (view: LineageView, link: string) => {
    const match = /#\^([a-zA-Z0-9]{4,})$/.exec(link);
    if (match) {
        const id = match[1];
        if (id) {
            const element = view.containerEl.querySelector(
                `[data-block-id="^${id}"`,
            ) as HTMLElement;
            if (element) {
                const card = element.closest('.lineage-card');
                if (card && card.id) {
                    selectCard(view, card.id);
                }
            }
        }
    }
};

export const handleLinks = (view: LineageView, e: MouseEvent) => {
    // eslint-disable-next-line no-undef
    if (!(e.target instanceof HTMLAnchorElement)) return;
    if (!e.target.hasClass('internal-link')) return;
    const link = e.target.dataset.href;
    if (!link) return;
    if (link.contains('#^')) {
        e.stopPropagation();
        handleBlockLink(view, link);
    } else if (link.startsWith('#')) {
        e.stopPropagation();
        handleHeading(view, link);
    } else {
        e.stopPropagation();
        openFileInNewSplit(view, link);
    }
};
