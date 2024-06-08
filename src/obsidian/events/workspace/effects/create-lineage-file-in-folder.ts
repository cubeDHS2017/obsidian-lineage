import Lineage from 'src/main';
import { TFolder } from 'obsidian';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFileInLineage } from 'src/obsidian/events/workspace/effects/open-file-in-lineage';

export const createLineageFileInFolder = async (
    plugin: Lineage,
    folder: TFolder,
    type: LineageDocumentFormat,
) => {
    const newFile = await createNewFile(plugin, folder);
    if (newFile) {
        await openFileInLineage(plugin, newFile, type, 'tab');
    }
};
