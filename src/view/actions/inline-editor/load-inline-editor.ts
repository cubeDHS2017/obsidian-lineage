import { getView } from 'src/view/components/container/context';

export const loadInlineEditor = (target: HTMLElement, nodeId: string) => {
    const view = getView();
    if (!view.file) return;
    view.inlineEditor.loadNode(target, nodeId);
    return {
        destroy: () => {
            view.inlineEditor.unloadNode(nodeId);
        },
    };
};
