import { LineageView } from 'src/view/view';
import { debounce, TFile } from 'obsidian';
import Lineage from 'src/main';

enum Classes {
    'unresolved' = 'is-unresolved',
}

const getNonExistentLinks = (plugin: Lineage, file: TFile) => {
    const cache = plugin.app.metadataCache.getFileCache(file);
    if (!cache?.links) {
        return new Set<string>();
    }

    const links = cache.links.map((link) => link.link.split('#')[0]);
    const nonExistentLinks = links.filter(
        (link) =>
            !plugin.app.metadataCache.getFirstLinkpathDest(link, file.path),
    );

    return new Set(nonExistentLinks);
};

const getFileLinkElements = (view: LineageView) => {
    return Array.from(
        view.contentEl.querySelectorAll('.internal-link'),
    ) as HTMLElement[];
};

const markUnresolvedLinks = (view: LineageView) => {
    const file = view.file;
    if (!file) return;

    const nonExistentLinks = getNonExistentLinks(view.plugin, file);
    const links = getFileLinkElements(view);
    for (const link of links) {
        const isUnresolved =
            link.dataset.href &&
            nonExistentLinks.has(link.dataset.href.split('#')[0]);
        const hasUnresolvedClass = link.hasClass(Classes.unresolved);
        if (isUnresolved) {
            if (!hasUnresolvedClass) {
                link.addClass(Classes.unresolved);
            }
        } else if (hasUnresolvedClass) {
            link.removeClass(Classes.unresolved);
        }
    }
};

const debounced = debounce(markUnresolvedLinks, 100);
export { debounced as markUnresolvedLinks };
