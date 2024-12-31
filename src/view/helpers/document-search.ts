import Fuse from 'fuse.js';
import { LineageView } from 'src/view/view';

export class DocumentSearch {
    constructor(private view: LineageView) {}
    private fuse: Fuse<{ id: string; content: string }> | null;
    #searchTriggeredMinimap: boolean;

    private updateIndex = () => {
        const documentState = this.view.documentStore.getValue();
        const viewState = this.view.viewStore.getValue();
        const items: { id: string; content: string }[] = [];
        for (const id of Object.keys(documentState.document.content)) {
            const content = documentState.document.content[id]?.content;
            if (content) {
                items.push({
                    id,
                    content,
                });
            }
        }
        this.fuse = new Fuse(items, {
            keys: ['content'],
            threshold: viewState.search.fuzzySearch ? 0.4 : 0.1,
            shouldSort: true,
            isCaseSensitive: false,
            ignoreLocation: true,
        });
    };

    resetIndex = () => {
        this.fuse = null;
    };

    search = (query: string) => {
        if (!this.fuse) {
            this.updateIndex();
        }
        return this.fuse!.search(query);
    };

    get searchTriggeredMinimap() {
        return this.#searchTriggeredMinimap;
    }
    set searchTriggeredMinimap(value: boolean) {
        this.#searchTriggeredMinimap = value;
    }
}
