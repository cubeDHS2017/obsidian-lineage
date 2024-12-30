import {
    AlignBranchState,
    alignElement,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';

export const alignParentsNodes = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    for (const id of viewState.document.activeBranch.sortedParentNodes) {
        const element = getNodeElement(container, id);
        if (element) {
            const columnId = alignElement(
                container,
                element,
                behavior,
                'vertical',
                settings.view.scrolling,
                settings.view.zoomLevel,
            );
            if (columnId) localState.columns.add(columnId);
        }
    }
};
