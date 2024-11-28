import {
    Content,
    DocumentBookmarks,
} from 'src/stores/document/document-state-type';

export type RefreshBookmarksAction = {
    type: 'BOOKMARKS/REFRESH';
};

export const refreshBookmarks = (
    bookmarks: DocumentBookmarks,
    content: Content,
) => {
    bookmarks.Ids = new Set(
        Array.from(bookmarks.Ids).filter((id) => content[id]),
    );
};
