import Lineage from 'src/main';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';
import { getActiveFile } from 'src/obsidian/commands/helpers/get-active-file';
import { TFolder } from 'obsidian';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { lang } from 'src/lang/lang';
import { openFileInLineage } from 'src/obsidian/events/workspace/effects/open-file-in-lineage';

export const createLineageDocument = async (
    plugin: Lineage,
    type: LineageDocumentFormat,
) => {
    try {
        const file = getActiveFile(plugin);
        let folder: TFolder | null = null;
        if (file) {
            folder = file.parent;
        } else {
            folder = plugin.app.vault.getRoot();
        }
        if (folder) {
            const newFile = await createNewFile(plugin, folder);
            if (newFile) {
                await openFileInLineage(plugin, newFile, type, 'tab');
            }
        }
    } catch (e) {
        onPluginError(e, 'command', lang.create_new_document);
    }
};
