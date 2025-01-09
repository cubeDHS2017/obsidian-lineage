import { Command } from 'obsidian';
import Lineage from 'src/main';
import { lang } from 'src/lang/lang';
import { slugify } from 'src/helpers/slugify';
import { toggleFileViewType } from 'src/obsidian/events/workspace/effects/toggle-file-view-type';
import { customIcons } from 'src/helpers/load-custom-icons';
import { getActiveFile } from 'src/obsidian/commands/helpers/get-active-file';
import { createLineageDocument } from 'src/obsidian/events/workspace/effects/create-lineage-document';
import { getActiveLineageView } from 'src/obsidian/commands/helpers/get-active-lineage-view';
import { openSplitNodeModal } from 'src/view/modals/split-node-modal/open-split-node-modal';
import { isEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import { copyLinkToBlock } from 'src/view/actions/context-menu/card-context-menu/helpers/copy-link-to-block';
import { extractBranch } from 'src/obsidian/commands/helpers/extract-branch/extract-branch';
import { exportColumn } from 'src/view/actions/context-menu/card-context-menu/helpers/export-column';
import { exportDocument } from 'src/obsidian/commands/helpers/export-document/export-document';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';
import { AltPrimaryModifier } from 'src/view/actions/keyboard-shortcuts/helpers/commands/presets/alt-primary-modifier';

const createCommands = (plugin: Lineage) => {
    const commands: (Omit<Command, 'id' | 'callback'> & {
        checkCallback: (checking: boolean) => boolean | void;
    })[] = [];
    commands.push({
        name: lang.cmd_toggle_lineage_view,
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
        name: lang.cmd_create_new_document,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            if (checking) return true;
            createLineageDocument(plugin);
        },
    });

    commands.push({
        name: lang.cmd_toggle_horizontal_scrolling_mode,
        icon: customIcons.alignH.name,
        checkCallback: (checking) => {
            if (checking) {
                return Boolean(getActiveLineageView(plugin));
            }
            plugin.settings.dispatch({
                type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE',
            });
        },
    });

    commands.push({
        name: lang.cmd_toggle_vertical_scrolling_mode,
        icon: customIcons.alignV.name,
        checkCallback: (checking) => {
            if (checking) {
                return Boolean(getActiveLineageView(plugin));
            }
            plugin.settings.dispatch({
                type: 'settings/view/scrolling/toggle-vertical-scrolling-mode',
            });
        },
    });

    commands.push({
        name: lang.cm_split_card,
        icon: customIcons.split.name,
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            openSplitNodeModal(view!);
        },
    });

    commands.push({
        name: lang.cm_copy_link_to_block,
        icon: 'links-coming-in',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            copyLinkToBlock(view!);
        },
    });

    commands.push({
        name: lang.cmd_toggle_pin_in_left_sidebar,
        icon: 'pin',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return view ? isEditing(view) : false;
            }
            if (!view) return;
            const viewState = view.viewStore.getValue();

            const documentStore = view.documentStore;
            const documentState = documentStore.getValue();
            const activeNode = viewState.document.activeNode;
            const isPinned = documentState.pinnedNodes.Ids.includes(activeNode);
            documentStore.dispatch({
                type: isPinned
                    ? 'document/pinned-nodes/unpin'
                    : 'document/pinned-nodes/pin',
                payload: { id: activeNode },
            });
        },
    });

    commands.push({
        name: lang.cmd_extract_branch,
        icon: customIcons.cards.name,
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            extractBranch(view!);
        },
    });

    commands.push({
        name: lang.cm_export_column,
        icon: 'file-text',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            exportColumn(view!);
        },
    });

    commands.push({
        name: lang.cm_export_document,
        icon: 'file-text',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            exportDocument(view!);
        },
    });

    commands.push({
        name: lang.cmd_toggle_minimap,
        icon: 'panel-right',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            plugin.settings.dispatch({
                type: 'VIEW/TOGGLE_MINIMAP',
            });
        },
    });

    commands.push({
        name: lang.cmd_toggle_left_sidebar,
        icon: 'panel-left',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            plugin.settings.dispatch({ type: 'view/left-sidebar/toggle' });
        },
    });

    commands.push({
        name: lang.cmd_space_between_cards,
        icon: customIcons.gap.name,
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            view!.plugin.settings.dispatch({
                type: 'view/modes/gap-between-cards/toggle',
            });
        },
    });
    commands.push({
        name: lang.cmd_toggle_single_column,
        icon: 'rectangle-vertical',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            view!.plugin.settings.dispatch({
                type: 'settings/view/modes/toggle-single-column',
            });
        },
    });

    commands.push({
        name: lang.cmd_reset_hotkeys,
        icon: 'keyboard',
        checkCallback: (checking) => {
            const view = getActiveLineageView(plugin);
            if (checking) {
                return Boolean(view);
            }
            plugin.settings.dispatch({
                type: 'settings/hotkeys/reset-all',
            });
        },
    });

    if (!isMacLike) {
        commands.push({
            name: lang.cmd_load_alt_hotkeys_preset,
            icon: 'keyboard',
            checkCallback: (checking) => {
                const view = getActiveLineageView(plugin);
                if (checking) {
                    return Boolean(view);
                }
                plugin.settings.dispatch({
                    type: 'settings/hotkeys/apply-preset',
                    payload: { preset: AltPrimaryModifier },
                });
            },
        });
    }
    return commands;
};

export const addCommands = (plugin: Lineage) => {
    const commands = createCommands(plugin);
    for (const command of commands) {
        plugin.addCommand({
            ...command,
            checkCallback: (checking) => {
                try {
                    return command.checkCallback(checking);
                } catch (e) {
                    onPluginError(e, 'command', command.name);
                    return false;
                }
            },
            id: slugify(command.name),
        });
    }
};
