import { DocumentBookmarks } from 'src/stores/document/document-state-type';

export type RemoveNodeBookmarkAction = {
    type: 'BOOKMARKS/REMOVE';
    payload: {
        id: string;
    };
};

export const removeNodeBookmark = (
    bookmarks: DocumentBookmarks,
    id: string,
) => {
    bookmarks.Ids.delete(id);
    bookmarks.Ids = new Set(bookmarks.Ids);
};
