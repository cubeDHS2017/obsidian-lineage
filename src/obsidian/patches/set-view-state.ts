import { ViewState } from 'obsidian';
import { FILE_VIEW_TYPE } from 'src/view/view';
import { fileViewTypeCache } from 'src/stores/settings/subscriptions/effects/update-file-view-type-cache';

export function setViewState(next: (...params: unknown[]) => unknown) {
    return function (state: ViewState, ...rest: unknown[]) {
        const isMarkdownView = state.type === 'markdown';

        const path = state?.state?.file;
        if (
            isMarkdownView &&
            fileViewTypeCache[path]?.viewType === FILE_VIEW_TYPE &&
            !state.state.inlineEditor
        ) {
            const newState = {
                ...state,
                type: FILE_VIEW_TYPE,
            };

            return next.apply(this, [newState, ...rest]);
        } else {
            return next.apply(this, [state, ...rest]);
        }
    };
}
