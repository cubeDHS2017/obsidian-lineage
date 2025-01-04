import { CommandHotkeys, hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { GroupName } from 'src/lang/hotkey-groups';
import { groupArrayByProperty } from 'src/helpers/group-array-by-property';
import { lang } from 'src/lang/lang';
import { hotkeysLang } from 'src/lang/hotkeys-lang';
import { derived } from 'src/lib/store/derived';
import { derived as svelteDerived } from 'svelte/store';

type GroupedHotkeys = Record<GroupName, CommandHotkeys[]>;

const HotkeysSearchTermStore = () =>
    derived(hotkeyStore, (state) => state.searchTerm);

const HotkeysStore = () => derived(hotkeyStore, (state) => state.hotkeys);

export const FilteredHotkeysStore = () =>
    svelteDerived(
        [HotkeysStore(), HotkeysSearchTermStore()],
        ([hotkeys, searchTerm]) => {
            let array: CommandHotkeys[] = [];
            if (searchTerm) {
                array = hotkeys.filter((c) => {
                    const fullName = hotkeysLang[c.name].toLowerCase();
                    return (
                        fullName.includes(searchTerm) ||
                        c.group.toLowerCase().includes(searchTerm)
                    );
                });
            } else array = hotkeys;
            return groupArrayByProperty(array, 'group', {
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
            } satisfies GroupedHotkeys);
        },
    );
