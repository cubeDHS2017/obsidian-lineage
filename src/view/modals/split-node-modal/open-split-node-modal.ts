import { SplitNodeModal } from 'src/view/modals/split-node-modal/split-node-modal';
import { LineageView } from 'src/view/view';
import { get } from 'svelte/store';

export const openSplitNodeModal = async (view: LineageView) => {
    const activeNode = view.viewStore.getValue().document.activeNode;
    if (!activeNode) return;
    const nodeContent =
        view.documentStore.getValue().document.content[activeNode].content;
    const modal = new SplitNodeModal({
        plugin: view.plugin,
        callbacks: {
            accept: () => {
                modal.close();
                const newContent = get(modal.state.content);
                const mode = get(modal.state.mode);
                if (mode && newContent !== nodeContent) {
                    view.documentStore.dispatch({
                        type: 'DOCUMENT/SPLIT_NODE',
                        payload: {
                            target: activeNode,
                            mode: mode,
                        },
                    });
                }
            },
            reject: () => {
                modal.close();
            },
        },
        nodeContent,
    });
    await modal.open();
};
