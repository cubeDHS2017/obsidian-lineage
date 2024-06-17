import { Menu, TFolder } from 'obsidian';
import Lineage from 'src/main';
import { lang } from 'src/lang/lang';
import { customIcons } from 'src/helpers/load-custom-icons';
import { createLineageFileInFolder } from 'src/obsidian/events/workspace/effects/create-lineage-file-in-folder';

export const addFolderContextMenuItems = (
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
