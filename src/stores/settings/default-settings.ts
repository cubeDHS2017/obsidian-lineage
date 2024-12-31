import { Settings } from './settings-type';

export const DEFAULT_CARD_WIDTH = 550;
export const DEFAULT_COLUMNS_GAP = 150;
export const DEFAULT_CARDS_GAP = 150;
export const DEFAULT_INDENTATION_WIDTH = 60;
export const DEFAULT_SETTINGS = (): Settings => ({
    documents: {},
    hotkeys: {
        customHotkeys: {},
    },
    view: {
        fontSize: 16,
        theme: {},
        cardWidth: DEFAULT_CARD_WIDTH,
        columnsGap: DEFAULT_COLUMNS_GAP,
        cardsGap: DEFAULT_CARDS_GAP,
        scrolling: {
            revealChildren: false,
            horizontalScrollingMode: 'reveal-active-card',
        },
        limitPreviewHeight: true,
        zoomLevel: 1,
        showMinimap: false,
        showLeftSidebar: false,
        leftSidebarWidth: 500,
        leftSidebarActiveTab: 'pinned-cards',
        applyGapBetweenCards: false,
        singleColumnMode: false,
        nodeIndentationWidth: DEFAULT_INDENTATION_WIDTH,
        maintainEditMode: false,
    },
    general: {
        defaultDocumentFormat: 'sections',
    },
    styleRules: {
        documents: {},
    },
});
