import { AlignBranchState } from 'src/lib/align-element/align-element-v-and-h';
import { alignParentsNodes } from './helpers/align-parents-nodes';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-active-node';
import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import {
    AlignBranchParams,
    defaultAlignBranchParams,
    matchActionToParams,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/match-action-to-params';
import { waitForElementToStopMoving } from 'src/lib/align-element/helpers/wait-for-element-to-stop-moving';
import { scrollFirstColumnToTheLeft } from 'src/stores/view/subscriptions/effects/align-branch/helpers/scroll-first-column-to-the-left';

export class AlignBranch {
    private state: { previousActiveGroupId: string } = {
        previousActiveGroupId: '',
    };
    private animationFrameHandle: number;
    constructor(public view: LineageView) {}

    align = async (action?: PluginAction, isRetry = false) => {
        cancelAnimationFrame(this.animationFrameHandle);
        const params = action
            ? matchActionToParams(this.view, action)
            : defaultAlignBranchParams;
        if (!params) return;
        if (params.delay > 0) await delay(params.delay);
        await this.view.inlineEditor.mounting;

        const settings = this.view.plugin.settings.getValue();
        const container = this.view.container!;
        const documentState = this.view.documentStore.getValue();

        this.animationFrameHandle = requestAnimationFrame(() => {
            const state: AlignBranchState = {
                columns: new Set<string>(),
            };
            if (params.scrollFirstColumnToTheLeft) {
                scrollFirstColumnToTheLeft(documentState, container);
            }
            if (settings.view.singleColumnMode) {
                this.alignSingleColumn(params, state);
            } else this.alignActiveBranch(params, state);
            if (action?.type === 'view/life-cycle/mount') this.resetState();
        });

        if (params.retry && !isRetry) {
            const activeNode =
                this.view.viewStore.getValue().document.activeNode;
            await waitForElementToStopMoving(this.view, activeNode);
            this.align(action, true);
        }
    };

    private alignSingleColumn = (
        params: AlignBranchParams,
        ephemeralState: AlignBranchState,
    ) => {
        const container = this.view.container!;
        const viewState = this.view.viewStore.getValue();
        const settings = this.view.plugin.settings.getValue();
        // used when toggling 'single column mode' on
        const horizontalMode = params.centerActiveNode
            ? 'keep-active-card-at-center'
            : settings.view.scrolling.horizontalScrollingMode;
        const verticalMode = params.centerActiveNode
            ? 'keep-active-card-at-center'
            : settings.view.scrolling.verticalScrollingMode;
        alignActiveNode(
            viewState,
            container,
            ephemeralState,
            settings.view.zoomLevel,
            horizontalMode,
            verticalMode,
            params.behavior,
        );
    };

    private alignActiveBranch = (
        params: AlignBranchParams,
        ephemeralState: AlignBranchState,
    ) => {
        const container = this.view.container!;
        const viewState = this.view.viewStore.getValue();
        const settings = this.view.plugin.settings.getValue();
        const documentState = this.view.documentStore.getValue();
        const groupId = viewState.document.activeBranch.group;
        let verticalScrollingMode =
            settings.view.scrolling.verticalScrollingMode;
        if (groupId !== this.state.previousActiveGroupId) {
            verticalScrollingMode = 'keep-active-card-at-center';
        }
        alignActiveNode(
            viewState,
            container,
            ephemeralState,
            settings.view.zoomLevel,
            settings.view.scrolling.horizontalScrollingMode,
            verticalScrollingMode,
            params.behavior,
        );
        alignParentsNodes(
            viewState,
            container,
            ephemeralState,
            settings,
            params.behavior,
        );

        alignChildColumns(
            viewState,
            documentState,
            container,
            ephemeralState,
            settings,
            params.behavior,
            params.alignInactiveColumns,
        );
        this.state.previousActiveGroupId = groupId;
    };

    private resetState = () => {
        this.state = {
            previousActiveGroupId: '',
        };
    };
}
