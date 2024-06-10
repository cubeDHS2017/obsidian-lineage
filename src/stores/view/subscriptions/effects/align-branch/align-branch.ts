import { DocumentState } from 'src/stores/document/document-state-type';
import { AlignBranchState } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsNodes } from 'src/stores/view/subscriptions/effects/align-branch/align-parents-nodes';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { applyZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/apply-zoom';
import { resetZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/reset-zoom';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-active-node';

const align = (
    documentState: DocumentState,
    viewState: ViewState,
    container: HTMLElement,
    settings: Settings,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    const localState: AlignBranchState = {
        columns: new Set<string>(),
    };
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
};

export const alignBranch = (
    documentState: DocumentState,
    viewState: ViewState,
    container: HTMLElement,
    settings: Settings,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    if (!viewState.document.activeNode) return;
    if (!container) return;
    const zooming = settings.view.zoomLevel !== 1;
    if (zooming) behavior = 'instant';

    if (!zooming)
        requestAnimationFrame(() => {
            align(
                documentState,
                viewState,
                container,
                settings,
                behavior,
                alignInactiveColumns,
            );
        });
    else {
        setTimeout(() => {
            resetZoom(container);
            align(
                documentState,
                viewState,
                container,
                settings,
                behavior,
                alignInactiveColumns,
            );
            applyZoom(viewState, container, settings.view.zoomLevel);
        });
    }
};
