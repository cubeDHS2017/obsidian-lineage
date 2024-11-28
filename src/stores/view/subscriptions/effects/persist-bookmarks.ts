import { LineageView } from 'src/view/view';

export const persistBookmarks = (view: LineageView) => {
    const documentState = view.documentStore.getValue();
    if (!documentState.file.path) return;
    const bookmarks = documentState.bookmarks;
    const sections = documentState.sections;
    const bookmarkedSections = Array.from(bookmarks.Ids).map(
        (id) => sections.id_section[id],
    );
    view.plugin.settings.dispatch({
        type: 'BOOKMARKS/UPDATE',
        payload: {
            sections: bookmarkedSections,
            filePath: documentState.file.path,
        },
    });
};
