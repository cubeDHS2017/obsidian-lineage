import { Hotkey } from 'obsidian';

import { CommandName } from 'src/lang/hotkey-groups';
import { StyleRule } from 'src/stores/settings/types/style-rules-types';

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

export type ScrollingSettings = {
    centerActiveNodeH: boolean;
    centerActiveNodeV: boolean;
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
        singleColumnMode: boolean;
        nodeIndentationWidth: number;
        maintainEditMode: boolean;
    };
    general: {
        defaultDocumentFormat: LineageDocumentFormat;
    };
    styleRules: {
        documents: { [path: string]: { rules: StyleRule[] } };
    };
};
