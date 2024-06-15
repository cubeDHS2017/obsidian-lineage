import { Menu, TFile, WorkspaceLeaf } from 'obsidian';
import Lineage from 'src/main';
import { FILE_VIEW_TYPE } from 'src/view/view';
import { lang } from 'src/lang/lang';
import { customIcons } from 'src/helpers/load-custom-icons';
import { toggleFileViewType } from 'src/obsidian/events/workspace/effects/toggle-file-view-type';

export const addToggleViewMenuItem = (
    menu: Menu,
    plugin: Lineage,
    file: TFile,
    leaf: WorkspaceLeaf | undefined,
) => {
    menu.addItem((item) => {
        const view = leaf?.view;
        if (!view) return;
        const isTree = leaf.view.getViewType() === FILE_VIEW_TYPE;
        item.setTitle(isTree ? lang.open_in_editor : lang.open_in_lineage);
        item.setIcon(isTree ? 'file-text' : customIcons.cards.name);

        item.onClick(async () => {
            toggleFileViewType(plugin, file, leaf);
        });
    });
};
