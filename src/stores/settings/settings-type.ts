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

export type DocumentBackup = {
    content: string;
    created: number;
};

export type LineageDocumentFormat = 'outline' | 'sections' | 'html-element';

export type ViewType = 'lineage' | 'markdown';
export type DocumentPreferences = {
    documentFormat: LineageDocumentFormat;
    viewType: ViewType;
    activeSection: string | null;
    bookmarks: {
        sections: string[];
    } | null;
};

export type Settings = {
    documents: Record<string, DocumentPreferences>;
    hotkeys: {
        customHotkeys: CustomHotkeys;
    };
    view: {
        fontSize: number;
        theme: Theme;
        cardWidth: number;
        minimumCardHeight?: number;
        scrolling: ScrollingSettings;
        limitPreviewHeight: boolean;
        zoomLevel: number;
        showMinimap: boolean;
        showBookmarks: boolean;
    };
    general: {
        defaultDocumentFormat: LineageDocumentFormat;
    };
    // when view.inlineEditor is enabled, and the file is opened by another markdown view, inlineEditor overrides file.data with card.data
    // a copy of file.data is saved in case obsidian closes while file.data is set tod card.data
    backup: {
        [file_path: string]: DocumentBackup;
    };
};
