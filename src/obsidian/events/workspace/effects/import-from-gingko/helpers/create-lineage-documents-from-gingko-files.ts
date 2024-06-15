import Lineage from 'src/main';
import invariant from 'tiny-invariant';
import { TFolder } from 'obsidian';
import { createNewFolder } from 'src/obsidian/events/workspace/effects/create-new-folder';
import { jsonToSections } from 'src/lib/data-conversion/json-to-sections';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { setDocumentFormat } from 'src/obsidian/events/workspace/actions/set-document-format';
import { setViewType } from 'src/obsidian/events/workspace/actions/set-view-type';
import { GingkoFile } from 'src/obsidian/events/workspace/effects/import-from-gingko/import-from-gingko';

export const createLineageDocumentsFromGingkoFiles = async (
    plugin: Lineage,
    files: GingkoFile[],
    folderPath: string,
) => {
    const parentFolder = plugin.app.vault.getFolderByPath(folderPath);
    invariant(parentFolder);
    let destinationFolder: TFolder;
    if (files.length === 1) {
        destinationFolder = parentFolder;
    } else {
        destinationFolder = await createNewFolder(
            plugin,
            parentFolder,
            'imported from gingko',
        );
    }
    if (!destinationFolder) throw new Error('Could not get destination folder');
    for (const file of files) {
        const sections = jsonToSections(file.tree);
        const createdFile = await createNewFile(
            plugin,
            destinationFolder,
            sections,
            file.basename,
        );
        setDocumentFormat(plugin, createdFile.path, 'sections');
        setViewType(plugin, createdFile.path, 'lineage');
    }
};
