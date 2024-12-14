import { LineageView } from 'src/view/view';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import { alignBranch } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const alignBranchAfterDocumentSave = (
    view: LineageView,
    action: DocumentStoreAction,
) => {
    const skip =
        action.type === 'DOCUMENT/SET_NODE_CONTENT' &&
        action.context.isInSidebar;
    if (skip) return;
    let scrollingBehavior: ScrollBehavior | undefined;
    let delay = 0;
    if (action.type === 'DOCUMENT/MOVE_NODE') {
        const verticalMove =
            action.payload.direction === 'down' ||
            action.payload.direction === 'up';
        if (verticalMove) scrollingBehavior = 'instant';
    } else if (action.type === 'DOCUMENT/LOAD_FILE') {
        scrollingBehavior = 'instant';
    } else if (action.type === 'DOCUMENT/DROP_NODE') {
        delay = 500;
    }
    if (delay > 0) {
        setTimeout(() => {
            alignBranch(
                view,
                scrollingBehavior,
                action.type === 'DOCUMENT/SPLIT_NODE' ? true : undefined,
            );
        }, delay);
    } else {
        alignBranch(
            view,
            scrollingBehavior,
            action.type === 'DOCUMENT/SPLIT_NODE' ? true : undefined,
        );
    }
};
