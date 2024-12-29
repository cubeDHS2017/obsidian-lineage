import { LineageView } from 'src/view/view';
import Lineage from 'src/main';
import { calculateDocumentProgressW } from 'src/workers/worker-instances';

export class StatusBar {
    private container: HTMLElement;
    private elements: {
        numberOfCards: HTMLElement;
        documentProgress: HTMLElement;
    };

    constructor(public plugin: Lineage) {
        this.onload();
    }

    onload() {
        this.container = this.plugin.addStatusBarItem();
        this.elements = {
            numberOfCards: this.container.createDiv(),
            documentProgress: this.container.createDiv(),
        };
        this.elements.documentProgress.style.marginLeft = '5px';
        this.elements.documentProgress.ariaLabel =
            'Progress through the document';
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', (x) => {
                const visible = Boolean(x && x.view instanceof LineageView);
                this.setVisibility(visible);
            }),
        );
    }

    private setVisibility(visible: boolean) {
        this.container.toggleClass('lineage__hidden-element', !visible);
    }

    updateAll = (view: LineageView) => {
        this.updateCardsNumber(view);
        this.updateProgressIndicator(view);
    };

    updateCardsNumber = (view: LineageView) => {
        const cards = Object.keys(
            view.documentStore.getValue().document.content,
        ).length;
        this.elements.numberOfCards.setText(
            cards + ' card' + (cards === 1 ? '' : 's'),
        );
    };
    updateProgressIndicator = async (view: LineageView) => {
        const document = view.documentStore.getValue().document;
        const activeNode = view.viewStore.getValue().document.activeNode;
        const progress = await calculateDocumentProgressW.run({
            document,
            activeNode,
        });
        this.elements.documentProgress.setText(progress + ' %');
    };
}
