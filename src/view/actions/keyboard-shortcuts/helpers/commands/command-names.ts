import { LineageView } from 'src/view/view';
import { Hotkey } from 'obsidian';

export const hotkeysLang = {
    save_changes_and_exit_card: 'Save changes and exit card',
    // toggle_edit_mode: 'Toggle edit',
    enable_edit_mode: 'Edit card',
    enable_edit_mode_and_place_cursor_at_start:
        'Edit card and place cursor at the start',
    disable_edit_mode: 'Cancel changes',
    add_child: 'Add child',
    add_below: 'Add card below',
    add_above: 'Add card above',
    add_child_and_split: 'Add child and split at cursor',
    add_below_and_split: 'Add card below and split at cursor',
    add_above_and_split: 'Add card above and split at cursor',
    delete_card: 'Delete card',
    go_up: 'Go up',
    go_down: 'Go down',
    go_right: 'Go right',
    go_left: 'Go left',
    undo_change: 'Undo change',
    redo_change: 'Redo change',
    move_node_up: 'Move card up',
    move_node_down: 'Move card down',
    move_node_right: 'Move card right',
    move_node_left: 'Move card left',
    merge_with_node_above: 'Merge with card above',
    merge_with_node_below: 'Merge with card below',
    toggle_search_input: 'Search',
    go_to_beginning_of_group: 'Go to start of group',
    go_to_end_of_group: 'Go to end of group',
    go_to_beginning_of_column: 'Go to start of column',
    go_to_end_of_column: 'Go to end of column',
    copy_node: 'Copy branch',
    copy_node_unformatted: 'Copy branch without formatting',
    copy_node_without_subitems: 'Copy without subitems',
    cut_node: 'Cut branch',
    paste_node: 'Paste branch',
    navigate_back: 'Navigate back',
    navigate_forward: 'Navigate forward',
    navigate_to_next_node: 'Select next card',
    navigate_to_previous_node: 'Select previous card',
    extend_select_up: 'Extend selection up',
    extend_select_down: 'Extend selection down',
    extend_select_to_start_of_group: 'Extend selection to start of group',
    extend_select_to_end_of_group: 'Extend selection to end of group',
    extend_select_to_start_of_column: 'Extend selection to start of column',
    extend_select_to_end_of_column: 'Extend selection to end of column',
    scroll_left: 'Scroll left',
    scroll_right: 'Scroll right',
    scroll_up: 'Scroll up',
    scroll_down: 'Scroll down',
    align_branch: 'Align active branch',
    zoom_in: 'Zoom in',
    zoom_out: 'Zoom out',
    zoom_reset: 'Reset zoom',
};
export type PluginCommand = {
    check: (view: LineageView) => boolean;
    callback: (view: LineageView, event: KeyboardEvent) => void;
    hotkeys: Hotkey[];
    name: CommandName;
};
export type CommandName = keyof typeof hotkeysLang;
export type GroupName = keyof typeof groupedHotkeys;
export const groupedHotkeys = {
    'Create cards': new Set([
        'add_child',
        'add_below',
        'add_above',
        'add_child_and_split',
        'add_below_and_split',
        'add_above_and_split',
    ]),
    'Edit cards': new Set([
        'enable_edit_mode',
        'enable_edit_mode_and_place_cursor_at_start',
        'disable_edit_mode',
        'save_changes_and_exit_card',
    ]),
    'Move cards': new Set([
        'move_node_up',
        'move_node_down',
        'move_node_right',
        'move_node_left',
    ]),
    'Merge cards': new Set(['merge_with_node_above', 'merge_with_node_below']),
    'Delete cards': new Set(['delete_card']),
    Navigation: new Set([
        'go_up',
        'go_down',
        'go_right',
        'go_left',
        'go_to_beginning_of_group',
        'go_to_end_of_group',
        'go_to_beginning_of_column',
        'go_to_end_of_column',
        'navigate_back',
        'navigate_forward',
        'navigate_to_previous_node',
        'navigate_to_next_node',
    ]),
    Selection: new Set([
        'extend_select_up',
        'extend_select_down',
        'extend_select_to_start_of_group',
        'extend_select_to_end_of_group',
        'extend_select_to_start_of_column',
        'extend_select_to_end_of_column',
    ]),
    History: new Set(['undo_change', 'redo_change']),
    Search: new Set(['toggle_search_input']),
    Clipboard: new Set([
        'copy_node',
        'copy_node_unformatted',
        'copy_node_without_subitems',
        'cut_node',
        'paste_node',
    ]),
    Scrolling: new Set([
        'scroll_left',
        'scroll_right',
        'scroll_up',
        'scroll_down',
        'align_branch',
    ]),
    Zoom: new Set(['zoom_in', 'zoom_out', 'zoom_reset']),
} satisfies Record<string, Set<CommandName>>;

export const hotkeysGroups: Record<CommandName, GroupName> = Object.fromEntries(
    Object.entries(groupedHotkeys)
        .map(([group, commands]) => Array.from(commands).map((c) => [c, group]))
        .flat(),
);
