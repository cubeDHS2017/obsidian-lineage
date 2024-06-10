import { LineageView } from 'src/view/view';
import { Menu } from 'obsidian';
import { extractBranch } from 'src/obsidian/commands/helpers/extract-branch/extract-branch';
import { mergeNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/merge-node';
import { copyNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/copy-node';
import { cutNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/cut-node';
import { pasteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/paste-node';
import { splitNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/split-node';
import { customIcons } from 'src/helpers/load-custom-icons';
import { hasNHeadings } from 'src/lib/format-detection/has-n-headings';
import { isOutline } from 'src/lib/format-detection/is-outline';

export const showCardContextMenu = (event: MouseEvent, view: LineageView) => {
    const menu = new Menu();

    const multipleNodesAreSelected =
        view.viewStore.getValue().document.selectedNodes.size > 1;

    menu.addItem((item) =>
        item
            .setTitle('Extract')
            .setIcon('file-symlink')
            .onClick(() => {
                extractBranch(view);
            })
            .setDisabled(multipleNodesAreSelected),
    );

    const input =
        view.documentStore.getValue().document.content[
            view.viewStore.getValue().document.activeNode
        ]?.content || '';

    menu.addSeparator();

    const _hasHeading = hasNHeadings(input);
    const _isOutline = !_hasHeading && isOutline(input);
    menu.addItem((item) =>
        item
            .setTitle('Split by headings')
            .setIcon(customIcons.split.name)
            .onClick(() => {
                splitNode(view, 'heading');
            })
            .setDisabled(!_hasHeading || multipleNodesAreSelected),
    );
    menu.addItem((item) =>
        item
            .setTitle('Split outline')
            .setIcon(customIcons.split.name)
            .onClick(() => {
                splitNode(view, 'outline');
            })
            .setDisabled(!_isOutline || multipleNodesAreSelected),
    );

    menu.addSeparator();

    menu.addItem((item) =>
        item
            .setTitle('Merge with the card above')
            .setIcon('merge')
            .onClick(() => {
                mergeNode(view, 'up');
            })
            .setDisabled(multipleNodesAreSelected),
    );
    menu.addItem((item) =>
        item
            .setTitle('Merge with the card below')
            .setIcon('merge')
            .onClick(() => {
                mergeNode(view, 'down');
            })
            .setDisabled(multipleNodesAreSelected),
    );
    menu.addSeparator();
    menu.addItem((item) =>
        item
            .setTitle('Copy')
            .setIcon('documents')
            .onClick(() => {
                copyNode(view);
            }),
    );

    menu.addItem((item) =>
        item
            .setTitle('Cut')
            .setIcon('scissors')
            .onClick(() => {
                cutNode(view);
            }),
    );

    menu.addItem((item) =>
        item
            .setTitle('Paste')
            .setIcon('paste')
            .onClick(() => {
                pasteNode(view);
            }),
    );

    menu.showAtMouseEvent(event);
};
