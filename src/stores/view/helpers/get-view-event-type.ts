import { ViewStoreAction } from 'src/stores/view/view-store-actions';

type ActionType = ViewStoreAction['type'];
const navigationEvents = new Set<ActionType>([
    'NAVIGATION/NAVIGATE_BACK',
    'NAVIGATION/NAVIGATE_FORWARD',
    'NAVIGATION/SELECT_NEXT_NODE',
]);

const searchEvents = new Set<ActionType>([
    'SEARCH/SET_QUERY',
    'SEARCH/SET_RESULTS',
    'SEARCH/TOGGLE_INPUT',
]);

const stateEvents = new Set<ActionType>([
    'DOCUMENT/SET_ACTIVE_NODE',
    'DOCUMENT/NAVIGATE_USING_KEYBOARD',
    'DOCUMENT/JUMP_TO_NODE',
]);

const editEvents = new Set<ActionType>([
    'DOCUMENT/ENABLE_EDIT_MODE',
    'DOCUMENT/CONFIRM_DISABLE_EDIT',
]);

export type ViewEventType = {
    activeNodeHistory?: boolean;
    activeNode?: boolean;
    search?: boolean;
    edit?: boolean;
};
const cachedResults: { [key: string]: ViewEventType } = {};

export const getViewEventType = (type: ActionType): ViewEventType => {
    if (cachedResults[type]) {
        return cachedResults[type];
    }

    let result: ViewEventType | null = null;

    if (navigationEvents.has(type)) result = { activeNodeHistory: true };
    else if (stateEvents.has(type)) result = { activeNode: true };
    else if (searchEvents.has(type)) result = { search: true };
    else if (editEvents.has(type)) result = { edit: true };
    if (!result) result = {};

    cachedResults[type] = result;

    return result;
};
