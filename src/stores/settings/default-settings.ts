import { Settings } from './settings-type';

export const DEFAULT_CARD_WIDTH = 550;
export const DEFAULT_SETTINGS = (): Settings => ({
    documents: {},
    hotkeys: {
        customHotkeys: {},
    },
    view: {
        fontSize: 16,
        theme: {},
        cardWidth: DEFAULT_CARD_WIDTH,
        scrolling: {
            revealChildren: false,
            horizontalScrollingMode: 'reveal-active-card',
        },
        limitPreviewHeight: true,
        zoomLevel: 1,
        showMinimap: false,
        showBookmarks: false,
    },
    general: {
        defaultDocumentFormat: 'sections',
    },
    backup: {},
});
