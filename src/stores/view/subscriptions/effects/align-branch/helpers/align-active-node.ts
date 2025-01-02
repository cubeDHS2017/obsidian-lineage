import { ViewState } from 'src/stores/view/view-state-type';
import {
    AlignBranchState,
    alignElementVAndH,
} from 'src/lib/align-element/align-element-v-and-h';
import { ScrollingMode } from 'src/stores/settings/settings-type';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';

export const alignActiveNode = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    zoomLevel: number,
    horizontalMode: ScrollingMode | null,
    verticalMode: ScrollingMode | null,
    behavior?: ScrollBehavior,
) => {
    const activeNodeId = viewState.document.activeNode;
    const element = getNodeElement(container, activeNodeId);
    if (!element) return;

    const columnId = alignElementVAndH(
        container,
        element,
        behavior,
        zoomLevel,
        horizontalMode,
        verticalMode,
    );
    if (columnId) localState.columns.add(columnId);
};
