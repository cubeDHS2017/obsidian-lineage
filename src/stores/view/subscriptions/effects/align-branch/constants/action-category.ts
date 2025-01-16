import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export type ActionCategory =
    | 'document/structure'
    | 'document/reset'
    | 'document/content'
    | 'view/active-node/keyboard'
    | 'view/active-node/mouse'
    | 'view/active-node/document'
    | 'view/active-node/search'
    | 'view/life-cycle'
    | 'view/resize'
    | 'view/editor'
    | 'view/outline'
    | 'manual'
    | 'settings/zoom'
    | 'settings/layout'
    | 'settings/scrolling'
    | 'other';

const actionCategoryDict: Partial<
    Record<PluginAction['type'], ActionCategory>
> = {
    'view/align-branch/center-node': 'manual',
    'view/align-branch/reveal-node': 'manual',
    'DOCUMENT/LOAD_FILE': 'document/reset',
    RESET_STORE: 'document/reset',
    'DOCUMENT/INSERT_NODE': 'document/structure',
    'DOCUMENT/DROP_NODE': 'document/structure',
    'DOCUMENT/DELETE_NODE': 'document/structure',
    'DOCUMENT/MERGE_NODE': 'document/structure',
    'DOCUMENT/MOVE_NODE': 'document/structure',
    'DOCUMENT/SPLIT_NODE': 'document/structure',
    'DOCUMENT/PASTE_NODE': 'document/structure',
    'DOCUMENT/EXTRACT_BRANCH': 'document/structure',
    'DOCUMENT/CUT_NODE': 'document/structure',
    'HISTORY/APPLY_PREVIOUS_SNAPSHOT': 'document/structure',
    'HISTORY/APPLY_NEXT_SNAPSHOT': 'document/structure',
    'HISTORY/SELECT_SNAPSHOT': 'document/structure',
    'DOCUMENT/SET_NODE_CONTENT': 'document/content',
    'DOCUMENT/FORMAT_HEADINGS': 'document/content',
    'view/main/disable-edit': 'view/editor',
    'view/main/enable-edit': 'view/editor',
    'SEARCH/SET_RESULTS': 'view/active-node/search',
    'search/toggle-show-all-nodes': 'view/active-node/search',
    'DOCUMENT/JUMP_TO_NODE': 'view/active-node/keyboard',
    'DOCUMENT/NAVIGATE_USING_KEYBOARD': 'view/active-node/keyboard',
    'NAVIGATION/SELECT_NEXT_NODE': 'view/active-node/mouse',
    'NAVIGATION/NAVIGATE_BACK': 'view/active-node/mouse',
    'NAVIGATION/NAVIGATE_FORWARD': 'view/active-node/mouse',
    'view/outline/toggle-collapse-node': 'view/outline',
    'view/outline/refresh-collapsed-nodes': 'view/outline',
    'view/outline/toggle-collapse-all': 'view/outline',
    // todo: add a separate event for effect source
    'view/set-active-node/mouse': 'view/active-node/mouse',
    'view/set-active-node/mouse-silent': 'other',
    'view/set-active-node/document': 'view/active-node/document',
    'view/set-active-node/search': 'view/active-node/search',
    'view/left-sidebar/set-width': 'settings/layout',
    'WORKSPACE/ACTIVE_LEAF_CHANGE': 'view/life-cycle',
    'WORKSPACE/RESIZE': 'view/resize',
    'WORKSPACE/LAYOUT_READY': 'view/life-cycle',
    'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW': 'view/life-cycle',
    'view/life-cycle/mount': 'view/life-cycle',
    'VIEW/TOGGLE_MINIMAP': 'settings/layout',
    'view/left-sidebar/toggle': 'settings/layout',
    SET_CARD_WIDTH: 'settings/layout',
    SET_CARDS_GAP: 'settings/layout',
    SET_MIN_CARD_HEIGHT: 'settings/layout',
    'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE': 'settings/scrolling',
    'settings/view/scrolling/toggle-vertical-scrolling-mode':
        'settings/scrolling',
    SET_LIMIT_PREVIEW_HEIGHT: 'settings/layout',
    'UI/CHANGE_ZOOM_LEVEL': 'settings/zoom',
    'view/modes/gap-between-cards/toggle': 'settings/layout',
    'settings/view/modes/toggle-single-column': 'settings/layout',
    'settings/view/set-node-indentation-width': 'settings/layout',
    'FS/SET_FILE_PATH': 'other',
    'DOCUMENT/COPY_NODE': 'other',
    'FILE/UPDATE_FRONTMATTER': 'other',
    'document/pinned-nodes/pin': 'other',
    'document/pinned-nodes/unpin': 'other',
    'document/pinned-nodes/remove-stale-nodes': 'other',
    'document/pinned-nodes/load-from-settings': 'other',
    'META/REFRESH_GROUP_PARENT_IDS': 'other',
    SET_DRAG_STARTED: 'other',
    'DOCUMENT/SET_DRAG_ENDED': 'other',
    UPDATE_ACTIVE_BRANCH: 'other',
    'view/confirmation/reset/disable-edit': 'other',
    'view/confirmation/reset/delete-node': 'other',
    'view/confirmation/confirm/delete-node': 'other',
    'view/confirmation/confirm/disable-edit': 'other',
    'DOCUMENT/CLEAR_SELECTION': 'other',
    'SEARCH/SET_QUERY': 'other',
    'SEARCH/TOGGLE_INPUT': 'other',
    'SEARCH/TOGGLE_FUZZY_MODE': 'other',
    'UI/TOGGLE_HELP_SIDEBAR': 'other',
    'UI/TOGGLE_HISTORY_SIDEBAR': 'other',
    'UI/TOGGLE_SETTINGS_SIDEBAR': 'other',
    CLOSE_MODALS: 'other',
    'view/modals/toggle-style-rules': 'other',
    'NAVIGATION/REMOVE_OBSOLETE': 'other',
    'view/pinned-nodes/set-active-node': 'other',
    'view/recent-nodes/set-active-node': 'other',
    'view/sidebar/enable-edit': 'other',
    'view/sidebar/disable-edit': 'other',
    'view/style-rules/update-results': 'other',
    'view/keyboard/shift/down': 'other',
    'view/keyboard/shift/up': 'other',
    'view/hotkeys/set-search-term': 'other',
    'view/hotkeys/update-conflicts': 'other',
    'view/selection/set-selection': 'other',
    SET_DOCUMENT_TYPE: 'other',
    SET_VIEW_TYPE: 'other',
    DELETE_DOCUMENT_PREFERENCES: 'other',
    'HISTORY/UPDATE_DOCUMENT_PATH': 'other',
    SET_CUSTOM_HOTKEYS: 'other',
    SET_FONT_SIZE: 'other',
    SET_CONTAINER_BG: 'other',
    SET_ACTIVE_BRANCH_BG: 'other',
    UPDATE_DOCUMENTS_DICTIONARY: 'other',
    'settings/document/persist-active-section': 'other',
    'GENERAL/SET_DEFAULT_DOCUMENT_FORMAT': 'other',
    'view/left-sidebar/set-active-tab': 'other',
    'settings/pinned-nodes/persist': 'other',
    'settings/pinned-nodes/persist-active-node': 'other',
    'settings/style-rules/add': 'other',
    'settings/style-rules/update': 'other',
    'settings/style-rules/delete': 'other',
    'settings/style-rules/move': 'other',
    'settings/style-rules/update-condition': 'other',
    'settings/style-rules/enable-rule': 'other',
    'settings/style-rules/disable-rule': 'other',
    'settings/view/set-maintain-edit-mode': 'other',
    'settings/view/theme/set-inactive-node-opacity': 'other',
    'settings/view/theme/set-active-branch-color': 'other',
    'settings/hotkeys/set-custom-hotkey': 'other',
    'settings/hotkeys/reset-custom-hotkey': 'other',
    'settings/hotkeys/reset-all': 'other',
    'settings/hotkeys/apply-preset': 'other',
    'settings/hotkeys/toggle-editor-state': 'other',
    'settings/hotkeys/set-blank': 'other',
    'DOCUMENTS/DELETE_DOCUMENT': 'other',
    'DOCUMENTS/UPDATE_DOCUMENT_PATH': 'other',
    'DOCUMENTS/ADD_DOCUMENT': 'other',
} as const;

export const actionCategory = new Map(
    Object.entries(actionCategoryDict),
) as Map<PluginAction['type'], ActionCategory>;

const actionCategoryPriorityDict: Record<ActionCategory, number> = {
    'document/reset': 100,
    'view/life-cycle': 100,
    'view/active-node/keyboard': 90,
    'view/active-node/mouse': 90,
    'document/structure': 80,
    'document/content': 70,
    'view/active-node/document': 30,
    'view/active-node/search': 30,
    'view/resize': 20,
    'view/editor': 20,
    'view/outline': 20,
    'settings/zoom': 20,
    'settings/layout': 20,
    'settings/scrolling': 20,
    manual: 10,
    other: 0,
};

export const actionCategoryPriority = new Map(
    Object.entries(actionCategoryPriorityDict),
) as Map<ActionCategory, number>;
