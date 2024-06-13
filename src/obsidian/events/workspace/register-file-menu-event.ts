import { lang } from 'src/lang/lang';
import { Menu, TFile, TFolder, WorkspaceLeaf } from 'obsidian';
import Lineage from 'src/main';
import { toggleFileViewType } from 'src/obsidian/events/workspace/effects/toggle-file-view-type';
import { FILE_VIEW_TYPE } from 'src/view/view';
import { customIcons } from 'src/helpers/load-custom-icons';
import { createLineageFileInFolder } from 'src/obsidian/events/workspace/effects/create-lineage-file-in-folder';

const addToggleViewMenuItem = (
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

const addFolderContextMenuItems = (
    menu: Menu,
    plugin: Lineage,
    folder: TFolder,
) => {
    menu.addItem((item) => {
        item.setTitle(lang.new_document);
        item.setIcon(customIcons.cards.name);
        item.onClick(() => createLineageFileInFolder(plugin, folder));
    });
};

export const registerFileMenuEvent = (plugin: Lineage) => {
    plugin.registerEvent(
        plugin.app.workspace.on(
            'file-menu',
            (menu, abstractFile, source, leaf) => {
                if (abstractFile instanceof TFile) {
                    addToggleViewMenuItem(menu, plugin, abstractFile, leaf);
                } else if (abstractFile instanceof TFolder) {
                    addFolderContextMenuItems(menu, plugin, abstractFile);
                }
            },
        ),
    );
};
