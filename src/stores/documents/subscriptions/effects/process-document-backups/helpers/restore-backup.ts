import Lineage from 'src/main';
import { DocumentBackup } from 'src/stores/settings/settings-type';
import { TFolder } from 'obsidian';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFile } from 'src/obsidian/events/workspace/effects/open-file';

export const restoreBackup = async (
    plugin: Lineage,
    backup: DocumentBackup,
    path: string,
) => {
    const pathParts = path.split('/');
    const maybeFileName = pathParts.pop();
    if (!maybeFileName || !maybeFileName.endsWith('.md'))
        throw new Error('invalid backup path: ' + path);
    const fileName = maybeFileName.replace(/\.md$/, '') + ' - backup';
    const folderPath = pathParts.join('/');
    let folder: TFolder;
    const maybeFolder = plugin.app.vault.getAbstractFileByPath(folderPath);
    if (maybeFolder instanceof TFolder) {
        folder = maybeFolder;
    } else {
        folder = plugin.app.vault.getRoot();
    }
    const newFile = await createNewFile(
        plugin,
        folder,
        backup.content,
        fileName,
    );
    await openFile(plugin, newFile, 'split');
};
