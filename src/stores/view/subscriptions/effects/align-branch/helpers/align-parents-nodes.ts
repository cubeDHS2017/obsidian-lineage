import { AlignBranchState } from 'src/lib/align-element/align-element-v-and-h';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignParentsNodes = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    for (const id of viewState.document.activeBranch.sortedParentNodes) {
        const element = getNodeElement(container, id);
        if (!element) continue;

        const columnId = alignElementVertically(
            container,
            element,
            settings.view.zoomLevel,
            null,
            behavior,
        );
        if (columnId) localState.columns.add(columnId);
    }
};
