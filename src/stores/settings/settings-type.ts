import { Hotkey } from 'obsidian';

import { CommandName } from 'src/view/actions/keyboard-shortcuts/helpers/commands/command-names';

export type CustomHotkeys = {
    [command in CommandName]?: {
        primary?: Hotkey;
        secondary?: Hotkey;
    };
};
export type Theme = {
    containerBg?: string;
    activeBranchBg?: string;
};

export type ScrollingMode = 'reveal-active-card' | 'keep-active-card-at-center';
export type ScrollingSettings = {
    horizontalScrollingMode: ScrollingMode;
    revealChildren: boolean;
};

export type LineageDocumentFormat = 'outline' | 'sections' | 'html-element';

export type ViewType = 'lineage' | 'markdown';
export type DocumentPreferences = {
    documentFormat: LineageDocumentFormat;
    viewType: ViewType;
    activeSection: string | null;
    pinnedSections: {
        sections: string[];
        activeSection: string | null;
    } | null;
};

export type LeftSidebarActiveTab = 'pinned-cards' | 'recent-cards';

export type Settings = {
    documents: Record<string, DocumentPreferences>;
    hotkeys: {
        customHotkeys: CustomHotkeys;
    };
    view: {
        fontSize: number;
        theme: Theme;
        cardWidth: number;
        columnsGap: number;
        cardsGap: number;
        minimumCardHeight?: number;
        scrolling: ScrollingSettings;
        limitPreviewHeight: boolean;
        zoomLevel: number;
        showMinimap: boolean;
        showLeftSidebar: boolean;
        leftSidebarWidth: number;
        leftSidebarActiveTab: LeftSidebarActiveTab;
        applyGapBetweenCards: boolean;
    };
    general: {
        defaultDocumentFormat: LineageDocumentFormat;
    };
};
