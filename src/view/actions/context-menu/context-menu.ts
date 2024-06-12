import { LineageView } from 'src/view/view';
import { Platform } from 'obsidian';
import { onLongPress } from 'src/view/actions/context-menu/helpers/on-long-press';
import { showCardContextMenu } from 'src/view/actions/context-menu/card-context-menu/show-card-context-menu';
import { cardContextMenuPredicate } from 'src/view/actions/context-menu/card-context-menu/card-context-menu-predicate';
import { viewContextMenuPredicate } from 'src/view/actions/context-menu/view-context-menu/view-context-menu-predicate';
import { showViewContextMenu } from 'src/view/actions/context-menu/view-context-menu/show-view-context-menu';

export const contextMenu = (element: HTMLElement, view: LineageView) => {
    const listener = (e: MouseEvent | TouchEvent) => {
        if (cardContextMenuPredicate(e)) {
            if (e instanceof MouseEvent) showCardContextMenu(e, view);
            else showCardContextMenu(new MouseEvent('contextmenu', e), view);
        } else if (viewContextMenuPredicate(e)) {
            if (e instanceof MouseEvent) showViewContextMenu(e, view);
            else showViewContextMenu(new MouseEvent('contextmenu', e), view);
        }
    };
    element.addEventListener('contextmenu', listener);

    let unsubFromLongPress: (() => void) | null = null;
    if (Platform.isMobile) {
        unsubFromLongPress = onLongPress(
            element,
            listener,
            cardContextMenuPredicate,
        );
    }
    return {
        destroy: () => {
            element.removeEventListener('contextmenu', listener);
            if (unsubFromLongPress) {
                unsubFromLongPress();
            }
        },
    };
};
