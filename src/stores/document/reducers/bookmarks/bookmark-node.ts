import { DocumentBookmarks } from 'src/stores/document/document-state-type';

export type BookmakNodeAction = {
    type: 'BOOKMARKS/ADD';
    payload: {
        id: string;
    };
};

export const bookmarkNode = (bookmarks: DocumentBookmarks, id: string) => {
    bookmarks.Ids.add(id);
    bookmarks.Ids = new Set(bookmarks.Ids);
};
