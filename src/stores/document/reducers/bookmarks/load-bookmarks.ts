import {
    DocumentBookmarks,
    Sections,
} from 'src/stores/document/document-state-type';

export type LoadBookmarksAction = {
    type: 'BOOKMARKS/LOAD';
    payload: {
        sections: string[];
    };
};

export const loadBookmarks = (
    bookmarks: DocumentBookmarks,
    sections: Sections,
    bookmarkedSections: string[],
) => {
    bookmarks.Ids = new Set(
        bookmarkedSections
            .map((section) => sections.section_id[section])
            .filter((x) => x),
    );
};
