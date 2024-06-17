import Lineage from 'src/main';
import { TFolder } from 'obsidian';
import invariant from 'tiny-invariant';
import { getUniqueFileName } from 'src/obsidian/events/workspace/effects/get-unique-file-name';

export const createNewFolder = async (
    plugin: Lineage,
    folder: TFolder,
    basename?: string,
) => {
    invariant(folder);
    const children = folder.children
        .map((c) => (c instanceof TFolder ? c.name : null))
        .filter((f) => f) as string[];
    const path = getUniqueFileName(folder.path, children, basename);

    const createdFolder = await plugin.app.vault.createFolder(path);
    invariant(createdFolder);
    return createdFolder;
};
