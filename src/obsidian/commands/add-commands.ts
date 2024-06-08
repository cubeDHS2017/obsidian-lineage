import { Command } from 'obsidian';
import Lineage from 'src/main';
import { lang } from 'src/lang/lang';
import { slugify } from 'src/helpers/slugify';
import { toggleFileViewType } from 'src/obsidian/events/workspace/effects/toggle-file-view-type';
import { LineageView } from 'src/view/view';
import { exportDocument } from 'src/obsidian/commands/helpers/export-document/export-document';
import { extractBranch } from 'src/obsidian/commands/helpers/extract-branch/extract-branch';
import { isActiveAndNotEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { customIcons } from 'src/helpers/load-custom-icons';
import { getActiveFile } from 'src/obsidian/commands/helpers/get-active-file';
import { createLineageDocument } from 'src/obsidian/events/workspace/effects/create-lineage-document';
import { setDocumentFormat } from 'src/obsidian/events/workspace/actions/set-document-format';
import { maybeGetDocumentFormat } from 'src/obsidian/events/workspace/helpers/maybe-get-document-format';

const createCommands = (plugin: Lineage) => {
    const commands: Omit<Command, 'id'>[] = [];

    commands.push({
        name: lang.toggle_lineage_view,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            const file = getActiveFile(plugin);
            if (file) {
                if (checking) return true;
                else {
                    toggleFileViewType(plugin, file, undefined);
                }
            }
        },
    });

    commands.push({
        name: lang.create_new_document,
        icon: customIcons.cards.name,
        callback: () => createLineageDocument(plugin, 'document'),
    });
    commands.push({
        name: lang.create_new_outline,
        icon: customIcons.cards.name,
        callback: () => createLineageDocument(plugin, 'outline'),
    });

    commands.push({
        name: lang.change_format_to_document,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            const view = plugin.app.workspace.getActiveViewOfType(LineageView);
            if (view && view.file) {
                if (checking) {
                    const preferences =
                        plugin.settings.getValue().documents[view.file.path];
                    return (
                        preferences && preferences.documentFormat === 'outline'
                    );
                } else {
                    setDocumentFormat(plugin, view.file.path, 'document');
                }
            }
        },
    });
    commands.push({
        name: lang.change_format_to_outline,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            const view = plugin.app.workspace.getActiveViewOfType(LineageView);
            if (view && view.file) {
                if (checking) {
                    const preferences =
                        plugin.settings.getValue().documents[view.file.path];
                    return (
                        preferences && preferences.documentFormat === 'document'
                    );
                } else {
                    setDocumentFormat(plugin, view.file.path, 'outline');
                }
            }
        },
    });
    commands.push({
        name: lang.export_document,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            const view = plugin.app.workspace.getActiveViewOfType(LineageView);

            if (view && view.file) {
                if (checking) {
                    return maybeGetDocumentFormat(view) === 'document';
                } else {
                    exportDocument(plugin, view.file, 'markdown');
                }
            }
        },
    });

    commands.push({
        name: lang.format_headings,
        icon: 'heading1',
        checkCallback: (checking) => {
            const view = plugin.app.workspace.getActiveViewOfType(LineageView);
            if (view) {
                if (checking) return true;
                else
                    view.documentStore.dispatch({
                        type: 'DOCUMENT/FORMAT_HEADINGS',
                    });
            }
        },
    });
    commands.push({
        name: lang.extract_branch,
        icon: 'file-symlink',
        checkCallback: (checking) => {
            const view = plugin.app.workspace.getActiveViewOfType(LineageView);
            if (view) {
                if (checking) return isActiveAndNotEditing(view);
                else {
                    extractBranch(view);
                }
            }
        },
    });
    return commands;
};

export const addCommands = (plugin: Lineage) => {
    const commands = createCommands(plugin);
    for (const command of commands) {
        plugin.addCommand({
            ...command,
            id: slugify(command.name),
        });
    }
};
