import { Command } from 'obsidian';
import Lineage from 'src/main';
import { lang } from 'src/lang/lang';
import { slugify } from 'src/helpers/slugify';
import { toggleFileViewType } from 'src/obsidian/events/workspace/effects/toggle-file-view-type';
import { customIcons } from 'src/helpers/load-custom-icons';
import { getActiveFile } from 'src/obsidian/commands/helpers/get-active-file';
import { createLineageDocument } from 'src/obsidian/events/workspace/effects/create-lineage-document';
import { getActiveLineageView } from 'src/obsidian/commands/helpers/get-active-lineage-view';

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
        callback: () => createLineageDocument(plugin),
    });

    commands.push({
        name: lang.toggle_scrolling_mode,
        icon: customIcons.align.name,
        checkCallback: (checking) => {
            if (checking) {
                return Boolean(getActiveLineageView(plugin));
            }
            plugin.settings.dispatch({
                type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE',
            });
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
