import { PluginAction } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

const actionPriorityRecord: Partial<Record<PluginAction['type'], number>> = {
    'view/life-cycle/mount': 100,
    'view/update-active-branch?source=document': 90,
    'DOCUMENT/JUMP_TO_NODE': 90,
    'NAVIGATION/SELECT_NEXT_NODE': 90,
    'DOCUMENT/NAVIGATE_USING_KEYBOARD': 90,
    'NAVIGATION/NAVIGATE_BACK': 90,
    'NAVIGATION/NAVIGATE_FORWARD': 90,
    'view/set-active-node/mouse': 90,
    'view/set-active-node/mouse-silent': 0,
    'view/set-active-node/search': 30,
    'view/align-branch/center-node': 30,
    'view/align-branch/reveal-node': 30,
    'DOCUMENT/SET_NODE_CONTENT': 30,
    'view/set-active-node/document': 20,
    'view/update-active-branch?source=view': 20,
    'view/main/disable-edit': 20,
    'view/main/enable-edit': 20,
    'view/outline/toggle-collapse-node': 10,
    'view/outline/refresh-collapsed-nodes': 10,
    'view/outline/toggle-collapse-all': 10,
    'DOCUMENT/FORMAT_HEADINGS': 10,
    'view/left-sidebar/set-width': 10,
    'WORKSPACE/ACTIVE_LEAF_CHANGE': 10,
    'WORKSPACE/RESIZE': 10,
    'WORKSPACE/LAYOUT_READY': 10,
    'WORKSPACE/SET_ACTIVE_LINEAGE_VIEW': 10,
    'VIEW/TOGGLE_MINIMAP': 10,
    'view/left-sidebar/toggle': 10,
    SET_CARD_WIDTH: 10,
    SET_CARDS_GAP: 10,
    SET_MIN_CARD_HEIGHT: 10,
    'view/modes/gap-between-cards/toggle': 10,
    'SEARCH/SET_RESULTS': 10,
    'search/toggle-show-all-nodes': 10,
    'SEARCH/SET_QUERY': 10,
    'SEARCH/TOGGLE_INPUT': 10,
    'SEARCH/TOGGLE_FUZZY_MODE': 10,
    'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE': 10,
    'settings/view/scrolling/toggle-vertical-scrolling-mode': 10,
    SET_LIMIT_PREVIEW_HEIGHT: 10,
    'UI/CHANGE_ZOOM_LEVEL': 10,
    'settings/view/modes/toggle-outline-mode': 10,
    'settings/view/set-node-indentation-width': 10,
};

export const actionPriority = new Map(
    Object.entries(actionPriorityRecord) as [PluginAction['type'], number][],
);
