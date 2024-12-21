import { LineageView } from 'src/view/view';
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
import {
    MenuItemObject,
    renderContextMenu,
} from 'src/obsidian/context-menu/render-context-menu';
import { selectInactiveCard } from 'src/obsidian/context-menu/select-inactive-card';

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
    const multipleNodesAreSelected =
        !isInSidebar && viewState.document.selectedNodes.size > 1;
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const activeNode = viewState.document.activeNode;
    const isPinned =
        (isInSidebar && !isInRecentCardsList) ||
        documentState.pinnedNodes.Ids.includes(activeNode);

    const menuItems: MenuItemObject[] = [
        {
            title: 'Split card',
            icon: customIcons.split.name,
            action: () => openSplitNodeModal(view),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        { type: 'separator' },
        {
            title: 'Merge with the card above',
            icon: 'merge',
            action: () => mergeNode(view, 'up'),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        {
            title: 'Merge with the card below',
            icon: 'merge',
            action: () => mergeNode(view, 'down'),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        { type: 'separator' },
        {
            title: 'Copy link to block',
            icon: 'links-coming-in',
            action: () => copyLinkToBlock(view),
            disabled: multipleNodesAreSelected,
        },
        { type: 'separator' },
        {
            title: 'Copy',
            icon: 'documents',
            submenu: [
                {
                    title: 'Copy branch',
                    icon: 'lineage-cards',
                    action: () => copyActiveBranchesToClipboard(view, true),
                },
                {
                    title: 'Copy branch without formatting',
                    icon: 'file-text',
                    action: () => copyActiveBranchesToClipboard(view, false),
                },
                {
                    title: 'Copy without sub-items',
                    icon: 'file-text',
                    action: () => copyActiveNodesToClipboard(view),
                },
            ],
        },
        {
            title: 'Cut',
            icon: 'scissors',
            action: () => cutNode(view),
            disabled: isInSidebar,
        },
        {
            title: 'Paste',
            icon: 'paste',
            action: () => pasteNode(view),
            disabled: isInSidebar,
        },
        { type: 'separator' },
        {
            title: isPinned ? 'Unpin' : 'Pin',
            icon: isPinned ? 'pin-off' : 'pin',
            action: () => {
                documentStore.dispatch({
                    type: isPinned
                        ? 'document/pinned-nodes/unpin'
                        : 'document/pinned-nodes/pin',
                    payload: { id: activeNode },
                });
            },
            disabled: isInRecentCardsList || multipleNodesAreSelected,
        },
        { type: 'separator' },
        {
            title: 'Extract branch',
            icon: customIcons.cards.name,
            action: () => extractBranch(view),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        {
            title: 'Export column',
            icon: 'file-text',
            action: () => exportColumn(view),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
    ];

    renderContextMenu(event, menuItems);
};
