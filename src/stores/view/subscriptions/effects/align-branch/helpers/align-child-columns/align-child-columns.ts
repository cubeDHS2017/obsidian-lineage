import { ViewState } from 'src/stores/view/view-state-type';
import { DocumentState } from 'src/stores/document/document-state-type';
import { AlignBranchState } from 'src/lib/align-element/align-element-v-and-h';
import { Settings } from 'src/stores/settings/settings-type';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { alignChildGroupOfColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-group-of-column';
import { alignInactiveColumn } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-inactive-column';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignChildColumns = (
    viewState: ViewState,
    documentState: DocumentState,
    container: HTMLElement,
    localState: AlignBranchState,
    settings: Settings,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    let previousActiveBranchNode: string | null = viewState.document.activeNode;
    for (const column of documentState.document.columns) {
        if (localState.columns.has(column.id)) continue;

        const activeNodesOfColumn =
            viewState.document.activeNodesOfColumn[column.id];

        const activeBranchNode: string | null =
            activeNodesOfColumn && previousActiveBranchNode
                ? activeNodesOfColumn[previousActiveBranchNode]
                : null;
        previousActiveBranchNode = activeBranchNode;
        if (activeBranchNode) {
            const element = getNodeElement(container, activeBranchNode);
            if (element) {
                const columnId = alignElementVertically(
                    container,
                    element,
                    settings.view.zoomLevel,
                    null,
                    behavior,
                );

                if (columnId) localState.columns.add(columnId);
            }
        } else {
            const childGroup = column.groups.find((g) =>
                viewState.document.activeBranch.childGroups.has(g.parentId),
            );
            if (childGroup) {
                alignChildGroupOfColumn(
                    viewState,
                    container,
                    column.id,
                    settings,
                    behavior,
                );
            } else if (alignInactiveColumns) {
                alignInactiveColumn(column, container, settings, behavior);
            }
        }
    }
};
