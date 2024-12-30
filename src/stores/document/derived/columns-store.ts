import { LineageView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const columnsStore = (view: LineageView) =>
    derived(view.documentStore, (state) => state.document.columns);

export const singleColumnStore = (view: LineageView) =>
    derived(view.documentStore, (state) => {
        return [state.document.columns[0]];
    });
