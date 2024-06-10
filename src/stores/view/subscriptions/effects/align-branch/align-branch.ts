import { DocumentState } from 'src/stores/document/document-state-type';
import { AlignBranchState } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsNodes } from 'src/stores/view/subscriptions/effects/align-branch/align-parents-nodes';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { applyZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/apply-zoom';
import { resetZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/reset-zoom';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-active-node';

export const alignBranch = (
    documentState: DocumentState,
    viewState: ViewState,
    container: HTMLElement,
    settings: Settings,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    if (settings.view.zoomLevel !== 1) behavior = 'instant';
    if (!container) return;
    const nodeId = viewState.document.activeNode;
    if (!nodeId) return;
    const localState: AlignBranchState = {
        columns: new Set<string>(),
    };

    requestAnimationFrame(() => {
        resetZoom(container);
        alignActiveNode(viewState, container, localState, settings, behavior);
        alignParentsNodes(viewState, container, localState, settings, behavior);

        alignChildColumns(
            viewState,
            documentState,
            container,
            localState,
            settings,
            behavior,
            alignInactiveColumns,
        );

        applyZoom(viewState, container, settings.view.zoomLevel);
    });
};
