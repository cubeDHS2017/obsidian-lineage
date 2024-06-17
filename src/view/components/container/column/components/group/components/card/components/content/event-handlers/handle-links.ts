import { LineageView } from 'src/view/view';

const selectCard = (view: LineageView, id: string) => {
    view.viewStore.dispatch({
        type: 'DOCUMENT/SET_ACTIVE_NODE',
        payload: {
            id: id,
        },
    });
};

const handleFile = (view: LineageView, link: string) => {
    const path = view.documentStore.getValue().file.path;
    if (link && path) {
        view.plugin.app.workspace.openLinkText(link, path, 'split');
    }
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

export const handleClick = (view: LineageView) => (e: MouseEvent) => {
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
        handleFile(view, link);
    }
};
