import { derivedOnAction } from 'src/lib/store/derived-on-action';
import { CommandHotkeys, hotkeyStore } from 'src/stores/hotkeys/hotkey-store';
import { GroupName } from 'src/lang/hotkey-groups';
import { groupArrayByProperty } from 'src/helpers/group-array-by-property';
import { lang } from 'src/lang/lang';
import { hotkeysLang } from 'src/lang/hotkeys-lang';

type GroupedHotkeys = Record<GroupName, CommandHotkeys[]>;
export const filteredHotkeys = derivedOnAction(
    hotkeyStore,
    (store) => {
        let array: CommandHotkeys[] = [];
        if (store.searchTerm) {
            array = store.hotkeys.filter((c) => {
                const fullName = hotkeysLang[c.name].toLowerCase();
                return (
                    fullName.includes(store.searchTerm) ||
                    c.group.toLowerCase().includes(store.searchTerm)
                );
            });
        } else array = store.hotkeys;
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
    ['UI/SET_SEARCH_TERM', 'SET_CONFLICTING_HOTKEYS'],
);
