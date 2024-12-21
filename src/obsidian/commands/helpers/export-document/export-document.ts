import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFile } from 'src/obsidian/events/workspace/effects/open-file';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { mapDocumentToText } from 'src/obsidian/commands/helpers/export-document/map-document-to-text';
import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { LineageView } from 'src/view/view';

export const exportDocument = async (view: LineageView) => {
    try {
        const file = view.file;
        if (!file) return;
        if (!file.parent) return;
        const fileData = await view.plugin.app.vault.read(file);
        const format = getDocumentFormat(view);
        const output = mapDocumentToText(fileData, file.basename, format);
        const newFile = await createNewFile(
            view.plugin,
            file.parent,
            output,
            file.basename,
        );
        if (newFile) {
            await openFile(view.plugin, newFile, 'split');
        }
    } catch (e) {
        onPluginError(e, 'command', { type: 'export-document' });
    }
};
