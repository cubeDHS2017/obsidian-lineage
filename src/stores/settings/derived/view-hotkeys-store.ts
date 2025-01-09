import { LineageView } from 'src/view/view';
import { derived } from 'svelte/store';
import {
    defaultViewHotkeys,
    ExtendedHotkey,
    ViewHotkey,
} from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
import { GroupName, hotkeysGroups } from 'src/lang/hotkey-groups';
import { hotkeyToString } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/hotkey-to-string';
import {
    ConflictingHotkeys,
    HotkeysSearchTerm,
} from 'src/stores/view/derived/hotkeys-store';
import { hotkeysLang } from 'src/lang/hotkeys-lang';
import { groupArrayByProperty } from 'src/helpers/group-array-by-property';
import { lang } from 'src/lang/lang';
import Lineage from 'src/main';

export const CustomHotkeysStore = (plugin: Lineage) =>
    derived(plugin.settings, (state) => state.hotkeys.customHotkeys);

export const ViewHotkeysStore = (plugin: Lineage) =>
    derived([CustomHotkeysStore(plugin)], ([customHotkeys]) => {
        const viewHotkeys: ViewHotkey[] = [];
        for (const defaultViewHotkey of defaultViewHotkeys()) {
            const customHotkey = customHotkeys[defaultViewHotkey.name];

            const hotkeys: ExtendedHotkey[] = defaultViewHotkey.hotkeys.map(
                (hotkey, i) => {
                    let isCustom = false;
                    if (i === 0 && customHotkey?.primary) {
                        hotkey = customHotkey.primary;
                        isCustom = true;
                    } else if (i === 1 && customHotkey?.secondary) {
                        hotkey = customHotkey.secondary;
                        isCustom = true;
                    }
                    return {
                        ...hotkey,
                        string_representation: hotkeyToString(hotkey),
                        isCustom,
                    };
                },
            );
            viewHotkeys.push({
                ...defaultViewHotkey,
                hotkeys,
                group: hotkeysGroups[defaultViewHotkey.name],
            });
        }

        return viewHotkeys;
    });

export const ConflictLabeledHotkeysStore = (view: LineageView) =>
    derived(
        [ViewHotkeysStore(view.plugin), ConflictingHotkeys(view)],
        ([hotkeys, conflicts]) => {
            let numberOfConflictingHotkeys = 0;
            const groupedByHotkey = new Map<string, Set<ViewHotkey>>();
            for (const viewHotkey of hotkeys) {
                for (const hotkey of viewHotkey.hotkeys) {
                    delete hotkey.obsidianConflict;
                    delete hotkey.pluginConflict;

                    const conflict = conflicts.get(
                        hotkey.string_representation,
                    );
                    if (conflict) {
                        hotkey.obsidianConflict = conflict;
                        numberOfConflictingHotkeys++;
                    } else {
                        let set = groupedByHotkey.get(
                            hotkey.string_representation,
                        );
                        if (!set) {
                            set = new Set();
                            groupedByHotkey.set(
                                hotkey.string_representation,
                                set,
                            );
                        }
                        set.add(viewHotkey);
                    }
                }
            }
            const conflicting = [...groupedByHotkey.entries()].filter(
                (v) => v[1].size > 1,
            );
            for (const [string_representation, hotkeys] of conflicting) {
                const conflicting = Array.from(hotkeys)
                    .map((h) => h.name)
                    .join(', ');
                for (const pluginHotkey of hotkeys) {
                    for (const hotkey of pluginHotkey.hotkeys) {
                        if (
                            hotkey.string_representation ===
                            string_representation
                        ) {
                            hotkey.pluginConflict = conflicting;
                            numberOfConflictingHotkeys++;
                        }
                    }
                }
            }
            return {
                hotkeys: [...hotkeys],
                numberOfConflictingHotkeys,
            };
        },
    );

type GroupedHotkeys = Record<GroupName, ViewHotkey[]>;
export const FilteredHotkeysStore = (view: LineageView) =>
    derived(
        [ConflictLabeledHotkeysStore(view), HotkeysSearchTerm(view)],
        ([hotkeys, searchTerm]) => {
            let array: ViewHotkey[] = [];
            if (searchTerm) {
                array = hotkeys.hotkeys.filter((c) => {
                    const fullName = hotkeysLang[c.name].toLowerCase();
                    return (
                        fullName.includes(searchTerm) ||
                        c.group.toLowerCase().includes(searchTerm)
                    );
                });
            } else array = hotkeys.hotkeys;
            return {
                hotkeys: groupArrayByProperty(array, 'group', {
                    [lang.hkg_create_cards]: [],
                    [lang.hkg_edit_cards]: [],
                    [lang.hkg_move_cards]: [],
                    [lang.hkg_merge_cards]: [],
                    [lang.hkg_delete_cards]: [],
                    [lang.hkg_clipboard]: [],
                    [lang.hkg_navigation]: [],
                    [lang.hkg_selection]: [],
                    [lang.hkg_scrolling]: [],
                    [lang.hkg_history]: [],
                    [lang.hkg_search]: [],
                    [lang.hkg_zoom]: [],
                } satisfies GroupedHotkeys),
                numberOfConflictingHotkeys: hotkeys.numberOfConflictingHotkeys,
            };
        },
    );
