import { LineageView } from 'src/view/view';
import { Menu } from 'obsidian';
import { extractBranch } from 'src/obsidian/commands/helpers/extract-branch/extract-branch';
import { mergeNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/merge-node';
import { copyActiveBranchesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-branches-to-clipboard';
import { copyActiveNodesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-active-nodes-to-clipboard';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';
import { openSplitNodeModal } from 'src/view/modals/split-node-modal/open-split-node-modal';
import { customIcons } from 'src/helpers/load-custom-icons';
import { copyLinkToBlock } from 'src/view/actions/context-menu/card-context-menu/helpers/copy-link-to-block';
import { exportColumn } from 'src/view/actions/context-menu/card-context-menu/helpers/export-column';

const selectInactiveCard = (
    view: LineageView,
    closestCardElement: HTMLElement,
    isInSidebar: boolean,
    isInRecentCardsList: boolean,
) => {
    const id = closestCardElement?.id;
    if (!isInSidebar) {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id,
            },
            // to prevent scrolling
            context: { modKey: true },
        });
    } else if (isInRecentCardsList) {
        view.viewStore.dispatch({
            type: 'view/recent-nodes/set-active-node',
            payload: {
                id,
            },
        });
    } else {
        view.viewStore.dispatch({
            type: 'view/pinned-nodes/set-active-node',
            payload: {
                id,
            },
        });
    }
};

export const showCardContextMenu = (event: MouseEvent, view: LineageView) => {
    const target = event.target as HTMLElement;
    const closestCardElement = target.closest(
        '.lineage-card',
    ) as HTMLElement | null;

    if (!closestCardElement) return;

    const selectedText = activeWindow.getSelection()?.toString();
    if (selectedText && selectedText.length > 0) {
        return;
    }

    const isInSidebar = Boolean(target.closest('.sidebar'));
    const isInRecentCardsList =
        isInSidebar && Boolean(target.closest('.recent-cards-container'));

    const targetIsActive = closestCardElement.hasClass('active-node');
    if (!targetIsActive) {
        selectInactiveCard(
            view,
            closestCardElement,
            isInSidebar,
            isInRecentCardsList,
        );
    }
    const viewState = view.viewStore.getValue();
    const multipleNodesAreSelected = viewState.document.selectedNodes.size > 1;

    const menu = new Menu();
    menu.addItem((item) =>
        item
            .setTitle('Split card')
            .setIcon(customIcons.split.name)
            .onClick(() => {
                openSplitNodeModal(view);
            })
            .setDisabled(isInSidebar),
    );

    menu.addSeparator();

    menu.addItem((item) =>
        item
            .setTitle('Merge with the card above')
            .setIcon('merge')
            .onClick(() => {
                mergeNode(view, 'up');
            })
            .setDisabled(multipleNodesAreSelected || isInSidebar),
    );
    menu.addItem((item) =>
        item
            .setTitle('Merge with the card below')
            .setIcon('merge')
            .onClick(() => {
                mergeNode(view, 'down');
            })
            .setDisabled(multipleNodesAreSelected || isInSidebar),
    );

    menu.addSeparator();
    menu.addItem((item) =>
        item
            .setTitle('Copy link to block')
            .setIcon('links-coming-in')
            .onClick(() => {
                copyLinkToBlock(view);
            }),
    );

    menu.addSeparator();
    menu.addItem((item) => {
        item.setTitle('Copy').setIcon('documents');
        const setSubmenuAPI =
            'setSubmenu' in item && typeof item.setSubmenu === 'function';
        if (!setSubmenuAPI) {
            throw new Error('item.setSubmenu is not a function');
        }
        // @ts-ignore
        const subMenu: Menu = item.setSubmenu();
        subMenu.addItem((subItem) =>
            subItem
                .setTitle('Copy branch')
                .setIcon('lineage-cards')
                .onClick(() => {
                    copyActiveBranchesToClipboard(view, true);
                }),
        );
        subMenu.addItem((subItem) =>
            subItem
                .setTitle('Copy branch without formatting')
                .setIcon('file-text')
                .onClick(() => {
                    copyActiveBranchesToClipboard(view, false);
                }),
        );
        subMenu.addItem((subItem) =>
            subItem
                .setTitle('Copy without sub-items')
                .setIcon('file-text')
                .onClick(() => {
                    copyActiveNodesToClipboard(view);
                }),
        );
    });

    menu.addItem((item) =>
        item
            .setTitle('Cut')
            .setIcon('scissors')
            .onClick(() => {
                cutNode(view);
            })
            .setDisabled(isInSidebar),
    );

    menu.addItem((item) =>
        item
            .setTitle('Paste')
            .setIcon('paste')
            .onClick(() => {
                pasteNode(view);
            })
            .setDisabled(isInSidebar),
    );

    menu.addSeparator();
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const activeNode = viewState.document.activeNode;
    const isPinned =
        (isInSidebar && !isInRecentCardsList) ||
        documentState.pinnedNodes.Ids.includes(activeNode);
    menu.addItem((item) =>
        item
            .setTitle(isPinned ? 'Unpin' : 'Pin')
            .setIcon(isPinned ? 'pin-off' : 'pin')
            .onClick(() => {
                documentStore.dispatch({
                    type: isPinned
                        ? 'document/pinned-nodes/unpin'
                        : 'document/pinned-nodes/pin',
                    payload: { id: activeNode },
                });
            })
            .setDisabled(isInRecentCardsList),
    );
    menu.addSeparator();
    menu.addItem((item) =>
        item
            .setTitle('Extract branch')
            .setIcon(customIcons.cards.name)
            .onClick(() => {
                extractBranch(view);
            })
            .setDisabled(multipleNodesAreSelected || isInSidebar),
    );

    menu.addItem((item) =>
        item
            .setTitle('Export column')
            .setIcon('file-text')
            .onClick(() => {
                exportColumn(view);
            })
            .setDisabled(multipleNodesAreSelected || isInSidebar),
    );

    menu.showAtMouseEvent(event);
};
