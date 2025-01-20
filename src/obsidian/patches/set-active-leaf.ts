import { WorkspaceLeaf } from 'obsidian';
import { LineageView } from 'src/view/view';

export function setActiveLeaf(next: (...params: unknown[]) => unknown) {
    return function (leaf: WorkspaceLeaf, param: unknown) {
        const isLineageViewAndIsEditing =
            leaf.view &&
            leaf.view instanceof LineageView &&
            leaf.view.inlineEditor?.nodeId;
        if (isLineageViewAndIsEditing) return;
        return next.call(this, leaf, param);
    };
}
