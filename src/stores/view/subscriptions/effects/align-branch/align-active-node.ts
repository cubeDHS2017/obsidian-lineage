import { ViewState } from 'src/stores/view/view-state-type';
import {
    AlignBranchState,
    alignElement,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { Settings } from 'src/stores/settings/settings-type';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';

export const alignActiveNode = (
    viewState: ViewState,
    container: HTMLElement,
    localState: AlignBranchState,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    const activeNodeId = viewState.document.activeNode;
    const element = getNodeElement(container, activeNodeId);
    if (element) {
        const childGroupElement =
            viewState.document.activeBranch.childGroups.size > 0
                ? getNodeElement(container, 'group-' + activeNodeId)
                : undefined;
        const columnId = alignElement(
            container,
            element,
            settings,
            behavior,
            'both',
            childGroupElement,
        );
        if (columnId) localState.columns.add(columnId);
    }
};
