import { LineageView } from 'src/view/view';
import Lineage from 'src/main';
import { calculateDocumentProgressW } from 'src/obsidian/status-bar/helpers/workers-instances';

type UpdateStatusBarAction =
    | {
          type: 'NUMBER_OF_CARDS';
          payload: { cards: number };
      }
    | {
          type: 'DOCUMENT_PROGRESS';
          payload: { view: LineageView };
      };

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

    update = async (action: UpdateStatusBarAction) => {
        if (action.type === 'NUMBER_OF_CARDS') {
            this.elements.numberOfCards.setText(
                action.payload.cards +
                    ' card' +
                    (action.payload.cards === 1 ? '' : 's'),
            );
        } else if (action.type === 'DOCUMENT_PROGRESS') {
            const document =
                action.payload.view.documentStore.getValue().document;
            const activeNode =
                action.payload.view.viewStore.getValue().document.activeNode;
            const progress = await calculateDocumentProgressW.run({
                document,
                activeNode,
            });
            this.elements.documentProgress.setText(progress + ' %');
        }
    };
}
