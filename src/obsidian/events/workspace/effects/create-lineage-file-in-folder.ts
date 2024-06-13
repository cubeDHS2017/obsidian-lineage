import Lineage from 'src/main';
import { TFolder } from 'obsidian';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFileInLineage } from 'src/obsidian/events/workspace/effects/open-file-in-lineage';

export const createLineageFileInFolder = async (
    plugin: Lineage,
    folder: TFolder,
) => {
    const newFile = await createNewFile(plugin, folder);
    if (newFile) {
        const format = plugin.settings.getValue().general.defaultDocumentFormat;
        await openFileInLineage(plugin, newFile, format, 'tab');
    }
};
