import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFile } from 'src/obsidian/events/workspace/effects/open-file';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { mapDocumentToText } from 'src/obsidian/commands/helpers/export-document/map-document-to-text';
import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { LineageView } from 'src/view/view';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';

export const exportDocument = async (view: LineageView) => {
    try {
        const file = view.file;
        if (!file) return;
        if (!file.parent) return;

        const viewState = view.viewStore.getValue();
        const isEditing = Boolean(viewState.document.editing.activeNodeId);
        if (isEditing) {
            saveNodeContent(view);
            setTimeout(() => {
                exportDocument(view);
            }, 100);
            return;
        }
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
