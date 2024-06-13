import { LineageView } from 'src/view/view';
import { insertBlockId } from 'src/view/actions/context-menu/card-context-menu/helpers/insert-block-id';
import { Notice } from 'obsidian';

export const copyLinkToBlock = async (view: LineageView) => {
    const file = view.file;
    if (!file) return;
    const activeNode = view.viewStore.getValue().document.activeNode;
    const documentState = view.documentStore.getValue();
    const content = documentState.document.content[activeNode];
    const text = content?.content;

    const output = insertBlockId(text);
    if (output) {
        const fileName = file.basename;
        view.documentStore.dispatch({
            type: 'DOCUMENT/SET_NODE_CONTENT',
            payload: {
                content: output.text,
                nodeId: activeNode,
            },
        });
        const link = `[[${fileName}#^${output.blockId}]]`;
        await navigator.clipboard.writeText(link);
        new Notice('Link copied to clipboard');
    } else {
        new Notice('Could not copy link to clipboard');
    }
};
