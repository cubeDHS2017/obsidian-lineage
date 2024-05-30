import { LineageView } from 'src/view/view';
import { Platform } from 'obsidian';

export const focusContainer = (view: LineageView) => {
    if (view.container) {
        const isEditingOnMobile =
            Platform.isMobile && Boolean(view.inlineEditor.activeNode);
        if (!isEditingOnMobile) view.container.focus();
    }
};
