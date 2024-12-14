import { LineageView } from 'src/view/view';
import { Notice } from 'obsidian';

export const pasteNode = async (view: LineageView) => {
    const viewState = view.viewStore.getValue();
    const text = (await navigator.clipboard.readText()).replace(/\r\n/g, '\n');
    if (text) {
        view.documentStore.dispatch({
            type: 'DOCUMENT/PASTE_NODE',
            payload: {
                targetNodeId: viewState.document.activeNode,
                text,
            },
        });
    } else {
        new Notice(
            'Lineage: paste action failed. Try pasting directly into a card.',
        );
    }
};
