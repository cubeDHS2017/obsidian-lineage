import { AlignBranchState } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { alignParentsNodes } from './align-parents-nodes';
import { alignChildColumns } from './align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/align-active-node';
import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import {
    matchActionToParams,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/match-action-to-params';
import { waitForElementToStopMoving } from 'src/stores/view/subscriptions/effects/align-branch/helpers/wait-for-element-to-stop-moving';
import { scrollFirstColumnToTheLeft } from 'src/stores/view/subscriptions/effects/align-branch/scroll-first-column-to-the-left';

type AlignBranchParams = {
    alignInactiveColumns: boolean;
    behavior: ScrollBehavior;
    delay: number;
    retry: boolean;
    scrollFirstColumnToTheLeft: boolean;
    centerActiveNode: boolean;
};

const defaultParams: AlignBranchParams = {
    alignInactiveColumns: false,
    behavior: 'smooth' as const,
    delay: 0,
    retry: false,
    scrollFirstColumnToTheLeft: false,
    centerActiveNode: false,
};

const align = (view: LineageView, params: AlignBranchParams) => {
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

        if (params.scrollFirstColumnToTheLeft) {
            scrollFirstColumnToTheLeft(documentState, settings, container);
        }
        if (settings.view.singleColumnMode) {
            alignActiveNode(
                viewState,
                container,
                localState,
                // used when toggling 'single column mode' on
                params.centerActiveNode
                    ? {
                          horizontalScrollingMode: 'keep-active-card-at-center',
                          revealChildren: false,
                      }
                    : settings.view.scrolling,
                settings.view.zoomLevel,
                params.behavior,
            );
            return;
        }
        alignActiveNode(
            viewState,
            container,
            localState,
            settings.view.scrolling,
            settings.view.zoomLevel,
            params.behavior,
        );
        alignParentsNodes(
            viewState,
            container,
            localState,
            settings,
            params.behavior,
        );

        alignChildColumns(
            viewState,
            documentState,
            container,
            localState,
            settings,
            params.behavior,
            params.alignInactiveColumns,
        );
    });
};

export const alignBranch = async (view: LineageView, action?: PluginAction) => {
    const params = action ? matchActionToParams(view, action) : defaultParams;
    if (!params) return;
    if (params.delay > 0) await delay(params.delay);
    await view.inlineEditor.mounting;
    align(view, params);

    if (params.retry) {
        const activeNode = view.viewStore.getValue().document.activeNode;
        await waitForElementToStopMoving(view, activeNode);
        align(view, params);
    }
};
