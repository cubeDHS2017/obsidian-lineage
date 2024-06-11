import { AlignBranchState } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsNodes } from 'src/stores/view/subscriptions/effects/align-branch/align-parents-nodes';
import { applyZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/apply-zoom';
import { resetZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/reset-zoom';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-active-node';
import { LineageView } from 'src/view/view';

const align = async (
    view: LineageView,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    const container = view.container;
    if (!container) return;
    const documentState = view.documentStore.getValue();
    const viewState = view.viewStore.getValue();
    const settings = view.plugin.settings.getValue();
    const zooming = settings.view.zoomLevel !== 1;
    if (zooming) behavior = 'instant';
    const localState: AlignBranchState = {
        columns: new Set<string>(),
    };

    await view.inlineEditor.mounting;
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
    view: LineageView,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    const container = view.container;
    if (!container) return;

    const viewState = view.viewStore.getValue();
    const zoomLevel = view.plugin.settings.getValue().view.zoomLevel;
    if (zoomLevel === 1) {
        requestAnimationFrame(() => {
            align(view, behavior, alignInactiveColumns);
        });
    } else {
        // using resetZoom in requestAnimationFrame results in transform:scale flashes
        setTimeout(() => {
            resetZoom(container);
            align(view, behavior, alignInactiveColumns).finally(() => {
                applyZoom(viewState, container, zoomLevel);
            });
        }, 16);
    }
};
