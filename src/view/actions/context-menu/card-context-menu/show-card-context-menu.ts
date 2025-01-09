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
import { lang } from 'src/lang/lang';
import { textIsSelected } from 'src/view/actions/context-menu/card-context-menu/helpers/text-is-selected';

export const showCardContextMenu = (event: MouseEvent, view: LineageView) => {
    const target = event.target as HTMLElement;
    const closestCardElement = target.closest(
        '.lineage-card',
    ) as HTMLElement | null;

    if (!closestCardElement) return;

    if (textIsSelected()) return;

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

    const hasChildren = documentState.meta.groupParentIds.has(activeNode);
    const menuItems: MenuItemObject[] = [
        {
            title: lang.cm_split_card,
            icon: customIcons.split.name,
            action: () => openSplitNodeModal(view),
            disabled: multipleNodesAreSelected || isInSidebar || hasChildren,
        },
        { type: 'separator' },
        {
            title: lang.cm_merge_above,
            icon: 'merge',
            action: () => mergeNode(view, 'up'),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        {
            title: lang.cm_merge_below,
            icon: 'merge',
            action: () => mergeNode(view, 'down'),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        { type: 'separator' },
        {
            title: lang.cm_copy_link_to_block,
            icon: 'links-coming-in',
            action: () => copyLinkToBlock(view),
            disabled: multipleNodesAreSelected,
        },
        { type: 'separator' },
        !multipleNodesAreSelected && !hasChildren
            ? {
                  title: lang.cm_copy,
                  icon: 'documents',
                  action: () => copyActiveNodesToClipboard(view),
              }
            : {
                  title: lang.cm_copy,
                  icon: 'documents',
                  submenu: [
                      {
                          title: multipleNodesAreSelected
                              ? lang.cm_copy_branches
                              : lang.cm_copy_branch,
                          icon: 'lineage-cards',
                          action: () =>
                              copyActiveBranchesToClipboard(view, true),
                      },
                      {
                          title: multipleNodesAreSelected
                              ? lang.cm_copy_branches_wo_formatting
                              : lang.cm_copy_branch_wo_formatting,
                          icon: 'file-text',
                          action: () =>
                              copyActiveBranchesToClipboard(view, false),
                      },
                      {
                          title: multipleNodesAreSelected
                              ? lang.cm_copy_section_wo_subitems
                              : lang.cm_copy_sections_wo_subitems,
                          icon: 'file-text',
                          action: () => copyActiveNodesToClipboard(view),
                      },
                  ],
              },
        {
            title: lang.cm_cut,
            icon: 'scissors',
            action: () => cutNode(view),
            disabled: isInSidebar,
        },
        {
            title: lang.cm_paste,
            icon: 'paste',
            action: () => pasteNode(view),
            disabled: isInSidebar,
        },
        { type: 'separator' },
        {
            title: isPinned
                ? lang.cm_unpin_from_left_sidebar
                : lang.cm_pin_in_left_sidebar,
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
            title: lang.cm_extract_branch,
            icon: customIcons.cards.name,
            action: () => extractBranch(view),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
        {
            title: lang.cm_export_column,
            icon: 'file-text',
            action: () => exportColumn(view),
            disabled: multipleNodesAreSelected || isInSidebar,
        },
    ];

    renderContextMenu(event, menuItems);
};
