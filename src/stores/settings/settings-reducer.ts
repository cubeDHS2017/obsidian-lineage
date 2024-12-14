import {
    CustomHotkeys,
    DocumentPreferences,
    LeftSidebarActiveTab,
    LineageDocumentFormat,
    Settings,
    ViewType,
} from './settings-type';
import {
    changeZoomLevel,
    ChangeZoomLevelAction,
} from 'src/stores/settings/reducers/change-zoom-level';

export type SettingsActions =
    | {
          type: 'SET_DOCUMENT_TYPE';
          payload: {
              path: string;
              format: LineageDocumentFormat;
          };
      }
    | {
          type: 'SET_VIEW_TYPE';
          payload: {
              path: string;
              type: ViewType;
          };
      }
    | {
          type: 'DELETE_DOCUMENT_PREFERENCES';
          payload: {
              path: string;
          };
      }
    | {
          type: 'HISTORY/UPDATE_DOCUMENT_PATH';
          payload: {
              oldPath: string;
              newPath: string;
          };
      }
    | {
          type: 'SET_CUSTOM_HOTKEYS';
          payload: {
              customHotkeys: CustomHotkeys;
          };
      }
    | {
          type: 'SET_FONT_SIZE';
          payload: {
              fontSize: number;
          };
      }
    | {
          type: 'SET_CONTAINER_BG';
          payload: {
              backgroundColor: string | undefined;
          };
      }
    | {
          type: 'SET_ACTIVE_BRANCH_BG';
          payload: {
              backgroundColor: string | undefined;
          };
      }
    | {
          type: 'SET_CARD_WIDTH';
          payload: {
              width: number;
          };
      }
    | {
          type: 'SET_COLUMNS_GAP';
          payload: {
              gap: number;
          };
      }
    | {
          type: 'SET_CARDS_GAP';
          payload: { gap: number };
      }
    | {
          type: 'SET_MIN_CARD_HEIGHT';
          payload: {
              height: number | undefined;
          };
      }
    | {
          type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE';
      }
    | {
          type: 'VIEW/SCROLLING/SET_REVEAL_CHILDREN';
          payload: {
              reveal: boolean;
          };
      }
    | {
          type: 'SET_LIMIT_PREVIEW_HEIGHT';
          payload: {
              limit: boolean;
          };
      }
    | {
          type: 'UPDATE_DOCUMENTS_DICTIONARY';
          payload: {
              documents: Record<string, DocumentPreferences>;
          };
      }
    | ChangeZoomLevelAction
    | PersistActiveNodeAction
    | {
          type: 'GENERAL/SET_DEFAULT_DOCUMENT_FORMAT';
          payload: {
              format: LineageDocumentFormat;
          };
      }
    | {
          type: 'VIEW/TOGGLE_MINIMAP';
      }
    | {
          type: 'view/left-sidebar/toggle';
      }
    | { type: 'view/left-sidebar/set-width'; payload: { width: number } }
    | {
          type: 'view/left-sidebar/set-active-tab';
          payload: { tab: LeftSidebarActiveTab };
      }
    | {
          type: 'settings/pinned-nodes/persist';
          payload: {
              filePath: string;
              sections: string[];
              section: string;
          };
      }
    | {
          type: 'settings/pinned-nodes/persist-active-node';
          payload: {
              filePath: string;
              section: string;
          };
      }
    | { type: 'view/modes/gap-between-cards/toggle' };

export type PersistActiveNodeAction = {
    type: 'DOCUMENT/SET_ACTIVE_NODE';
    payload: {
        path: string;
        sectionNumber: string;
    };
};

const updateState = (store: Settings, action: SettingsActions) => {
    if (action.type === 'DELETE_DOCUMENT_PREFERENCES') {
        delete store.documents[action.payload.path];
    } else if (action.type === 'SET_DOCUMENT_TYPE') {
        if (!store.documents[action.payload.path]) {
            store.documents[action.payload.path] = {
                documentFormat: action.payload.format,
                viewType: 'lineage',
                activeSection: null,
                pinnedSections: {
                    sections: [],
                    activeSection: null,
                },
            };
        } else {
            store.documents[action.payload.path].documentFormat =
                action.payload.format;
        }
    } else if (action.type === 'SET_VIEW_TYPE') {
        if (store.documents[action.payload.path]) {
            store.documents[action.payload.path].viewType = action.payload.type;
        }
    } else if (action.type === 'DOCUMENT/SET_ACTIVE_NODE') {
        if (store.documents[action.payload.path]) {
            store.documents[action.payload.path].activeSection =
                action.payload.sectionNumber;
        }
    } else if (action.type === 'HISTORY/UPDATE_DOCUMENT_PATH') {
        const preferences = store.documents[action.payload.oldPath];
        delete store.documents[action.payload.oldPath];
        store.documents[action.payload.newPath] = preferences;
    } else if (action.type === 'SET_CUSTOM_HOTKEYS') {
        store.hotkeys.customHotkeys = action.payload.customHotkeys;
    } else if (action.type === 'SET_FONT_SIZE') {
        store.view.fontSize = action.payload.fontSize;
    } else if (action.type === 'SET_CONTAINER_BG') {
        store.view.theme.containerBg = action.payload.backgroundColor;
    } else if (action.type === 'SET_ACTIVE_BRANCH_BG') {
        store.view.theme.activeBranchBg = action.payload.backgroundColor;
    } else if (action.type === 'SET_CARD_WIDTH') {
        store.view.cardWidth = action.payload.width;
    } else if (action.type === 'SET_MIN_CARD_HEIGHT') {
        store.view.minimumCardHeight = action.payload.height;
    } else if (action.type === 'SET_LIMIT_PREVIEW_HEIGHT') {
        store.view.limitPreviewHeight = action.payload.limit;
    } else if (action.type === 'UPDATE_DOCUMENTS_DICTIONARY') {
        store.documents = action.payload.documents;
    } else if (action.type === 'UI/CHANGE_ZOOM_LEVEL') {
        changeZoomLevel(store, action.payload);
    } else if (action.type === 'GENERAL/SET_DEFAULT_DOCUMENT_FORMAT') {
        store.general.defaultDocumentFormat = action.payload.format;
    } else if (action.type === 'VIEW/TOGGLE_MINIMAP') {
        store.view.showMinimap = !store.view.showMinimap;
    } else if (action.type === 'view/left-sidebar/toggle') {
        store.view.showLeftSidebar = !store.view.showLeftSidebar;
    } else if (action.type === 'settings/pinned-nodes/persist') {
        const document = store.documents[action.payload.filePath];
        if (!document.pinnedSections) {
            document.pinnedSections = {
                sections: [],
                activeSection: null,
            };
        }
        document.pinnedSections.sections = action.payload.sections;
        document.pinnedSections.activeSection = action.payload.section;
    } else if (action.type === 'settings/pinned-nodes/persist-active-node') {
        const document = store.documents[action.payload.filePath];
        if (!document.pinnedSections) {
            document.pinnedSections = {
                sections: [],
                activeSection: null,
            };
        }
        document.pinnedSections.activeSection = action.payload.section;
    } else if (action.type === 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE') {
        store.view.scrolling.horizontalScrollingMode =
            store.view.scrolling.horizontalScrollingMode ===
            'reveal-active-card'
                ? 'keep-active-card-at-center'
                : 'reveal-active-card';
        store.view.scrolling = {
            ...store.view.scrolling,
        };
    } else if (action.type === 'VIEW/SCROLLING/SET_REVEAL_CHILDREN') {
        store.view.scrolling.revealChildren = action.payload.reveal;
        store.view.scrolling = {
            ...store.view.scrolling,
        };
    } else if (action.type === 'SET_COLUMNS_GAP') {
        store.view.columnsGap = action.payload.gap;
    } else if (action.type === 'SET_CARDS_GAP') {
        store.view.cardsGap = action.payload.gap;
    } else if (action.type === 'view/left-sidebar/set-width') {
        if (action.payload.width > 0) {
            store.view.leftSidebarWidth = action.payload.width;
        }
    } else if (action.type === 'view/left-sidebar/set-active-tab') {
        store.view.leftSidebarActiveTab = action.payload.tab;
    } else if (action.type === 'view/modes/gap-between-cards/toggle') {
        store.view.applyGapBetweenCards = !store.view.applyGapBetweenCards;
    }
};
export const settingsReducer = (
    store: Settings,
    action: SettingsActions,
): Settings => {
    updateState(store, action);
    return store;
};
