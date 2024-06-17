import { LineageView } from 'src/view/view';
import { Platform } from 'obsidian';

export const focusContainer = (view: LineageView) => {
    setTimeout(() => {
        if (view.container) {
            const isEditing = Boolean(view.inlineEditor.activeNode);
            const isEditingOnMobile = Platform.isMobile && isEditing;
            if (!isEditingOnMobile) {
                if (isEditing) view.inlineEditor.focus();
                else view.container.focus();
            }
        }
    }, 16);
};
