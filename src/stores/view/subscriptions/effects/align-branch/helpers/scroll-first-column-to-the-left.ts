import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignElementHorizontally } from 'src/lib/align-element/align-element-horizontally';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export const scrollFirstColumnToTheLeft = (context: AlignBranchContext) => {
    const firstColumnId = context.documentState.document.columns[0]?.id;
    if (!firstColumnId) return;
    const firstColumnElement = getNodeElement(context.container, firstColumnId);
    if (!firstColumnElement) return;
    if (firstColumnId) {
        alignElementHorizontally(context, firstColumnElement, false, true);
    }
};
