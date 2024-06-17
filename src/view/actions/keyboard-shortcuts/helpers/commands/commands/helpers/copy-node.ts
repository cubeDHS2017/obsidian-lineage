import { LineageView } from 'src/view/view';
import { copyActiveBranchesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branches-to-clipboard';

export const copyNode = async (view: LineageView) => {
    const document = view.viewStore.getValue().document;
    await copyActiveBranchesToClipboard(view);
    view.documentStore.dispatch({
        type: 'DOCUMENT/COPY_NODE',
        payload: {
            nodeId: document.activeNode,
            selectedNodes: document.selectedNodes,
        },
    });
};
