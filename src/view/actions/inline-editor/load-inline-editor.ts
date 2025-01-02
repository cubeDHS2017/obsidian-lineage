import { LineageView } from 'src/view/view';

export const loadInlineEditor = (
    target: HTMLElement,
    { nodeId, view }: { view: LineageView; nodeId: string },
) => {
    if (!view.file) return;
    view.inlineEditor.loadNode(target, nodeId);
    return {
        destroy: () => {
            view.inlineEditor.unloadNode(nodeId);
        },
    };
};
