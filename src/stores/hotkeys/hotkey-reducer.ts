import { HotkeyState } from 'src/stores/hotkeys/hotkey-store';
import {
    loadCustomHotkeys,
    LoadCustomHotkeysAction,
} from 'src/stores/hotkeys/reducers/load-custom-hotkeys';
import {
    updateHotkey,
    UpdateHotkeyAction,
} from 'src/stores/hotkeys/reducers/update-hotkey';
import {
    resetHotkey,
    ResetHotkeyAction,
} from 'src/stores/hotkeys/reducers/reset-hotkey';
import {
    updateConflictingHotkeys,
    UpdateConflictingHotkeysAction,
} from 'src/stores/hotkeys/reducers/update-conflicting-hotkeys';
import { CustomHotkeys } from 'src/stores/settings/settings-type';

export type SetSearchTermAction = {
    type: 'UI/SET_SEARCH_TERM';
    payload: {
        searchTerm: string;
    };
};
export type HotkeyAction =
    | SetSearchTermAction
    | LoadCustomHotkeysAction
    | UpdateHotkeyAction
    | ResetHotkeyAction
    | UpdateConflictingHotkeysAction
    | {
          type: 'hotkeys/reset-all';
      }
    | {
          type: 'hotkeys/apply-preset';
          payload: { preset: CustomHotkeys };
      };

const updateState = (state: HotkeyState, action: HotkeyAction) => {
    if (action.type === 'UI/SET_SEARCH_TERM') {
        state.searchTerm = action.payload.searchTerm.toLowerCase();
    } else if (action.type === 'SETTINGS/LOAD_CUSTOM_HOTKEYS') {
        loadCustomHotkeys(state, action.payload.customHotkeys);
        state.hotkeys = [...state.hotkeys];
    } else if (action.type === 'HOTKEY/UPDATE') {
        updateHotkey(state, action.payload);
        state.hotkeys = [...state.hotkeys];
    } else if (action.type === 'HOTKEY/RESET') {
        resetHotkey(state, action);
        state.hotkeys = [...state.hotkeys];
    } else if (action.type === 'SET_CONFLICTING_HOTKEYS') {
        updateConflictingHotkeys(state, action);
        state.hotkeys = [...state.hotkeys];
    } else if (action.type === 'hotkeys/reset-all') {
        loadCustomHotkeys(state, {});
        state.hotkeys = [...state.hotkeys];
    } else if (action.type === 'hotkeys/apply-preset') {
        state.customHotkeys = {
            ...state.customHotkeys,
            ...action.payload.preset,
        };
        loadCustomHotkeys(state, state.customHotkeys);
        state.hotkeys = [...state.hotkeys];
    }
};

export const hotkeyReducer = (
    store: HotkeyState,
    action: HotkeyAction,
): HotkeyState => {
    updateState(store, action);
    return store;
};
