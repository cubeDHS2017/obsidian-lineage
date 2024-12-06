import { AlignBranchState } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsNodes } from 'src/stores/view/subscriptions/effects/align-branch/align-parents-nodes';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-active-node';
import { LineageView } from 'src/view/view';

export const alignBranch = async (
    view: LineageView,
    behavior?: ScrollBehavior,
    alignInactiveColumns = false,
) => {
    await view.inlineEditor.mounting;
    requestAnimationFrame(() => {
        const container = view.container;
        if (!container) return;
        const documentState = view.documentStore.getValue();
        const viewState = view.viewStore.getValue();
        const settings = view.plugin.settings.getValue();
        if (!viewState.document.activeNode) return;
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
    });
};
