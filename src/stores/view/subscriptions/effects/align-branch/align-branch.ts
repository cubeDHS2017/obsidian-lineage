import { AlignBranchState } from 'src/lib/align-element/align-element-v-and-h';
import { alignParentsNodes } from './helpers/align-parents-nodes';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-active-node';
import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import {
    AlignBranchParams,
    matchActionToParams,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/match-action-to-params';
import { waitForElementToStopMoving } from 'src/lib/align-element/helpers/wait-for-element-to-stop-moving';
import { scrollFirstColumnToTheLeft } from 'src/stores/view/subscriptions/effects/align-branch/helpers/scroll-first-column-to-the-left';
import { ViewState } from 'src/stores/view/view-state-type';
import { DocumentState } from 'src/stores/document/document-state-type';
import {
    AlignBranchSettings,
    matchActionToSettings,
} from 'src/stores/view/subscriptions/effects/align-branch/helpers/match-action-to-settings';
import { ActiveBranch } from 'src/stores/view/default-view-state';

export type AlignBranchContext = {
    activeNode: string;
    activeBranch: ActiveBranch;
    viewState: ViewState;
    documentState: DocumentState;
    container: HTMLElement;
    containerRect: DOMRect;
    settings: AlignBranchSettings;
    state: AlignBranchState;
    alignInactiveColumns: boolean;
    activeNodeRect?: DOMRect;
    isNewGroup: boolean;
    isChildOfPreviousNode: boolean;
    isParentOfPreviousNode: boolean;
};

export class AlignBranch {
    private state: {
        previousGroupId: string;
        previousNodeId: string;
        previousBehaviorTime: number;
        previousBehavior: ScrollBehavior | null;
    } = {
        previousGroupId: '',
        previousNodeId: '',
        previousBehaviorTime: -1,
        previousBehavior: null,
    };
    private animationFrameHandle: number;
    constructor(public view: LineageView) {}

    align = async (action?: PluginAction, isRetry = false) => {
        cancelAnimationFrame(this.animationFrameHandle);
        const settings = this.view.plugin.settings.getValue();
        const params = matchActionToParams(settings, action);
        if (!params) return;
        if (params.delay > 0) await delay(params.delay);
        await this.view.inlineEditor.mounting;

        const context = this.createContext(params, action);

        this.animationFrameHandle = requestAnimationFrame(() => {
            if (params.scrollFirstColumnToTheLeft) {
                scrollFirstColumnToTheLeft(context);
            }

            if (settings.view.singleColumnMode) {
                this.alignSingleColumn(context);
            } else {
                this.alignActiveBranch(context);
            }
        });
        this.updateState(context, action);

        if (params.retry && !isRetry) {
            await waitForElementToStopMoving(this.view, context.activeNode);
            this.align(action, true);
        }
    };

    private alignSingleColumn = (context: AlignBranchContext) => {
        alignActiveNode(context);
    };

    private alignActiveBranch = (context: AlignBranchContext) => {
        const shouldAlignParentNodes =
            context.settings.centerActiveNodeV ||
            (context.isNewGroup && !context.isChildOfPreviousNode);
        const shouldAlignChildGroups =
            context.settings.centerActiveNodeV ||
            (!context.isParentOfPreviousNode && !context.isChildOfPreviousNode);

        alignActiveNode(context);
        if (shouldAlignParentNodes) {
            alignParentsNodes(context);
        }

        if (shouldAlignChildGroups) {
            alignChildColumns(context);
        }
    };

    private createContext = (
        params: AlignBranchParams,
        action?: PluginAction,
    ) => {
        const settings = this.view.plugin.settings.getValue();
        const container = this.view.container!;
        const documentState = this.view.documentStore.getValue();
        const viewState = this.view.viewStore.getValue();
        const newGroupId = viewState.document.activeBranch.group;
        const parentNodeId =
            viewState.document.activeBranch.sortedParentNodes[
                viewState.document.activeBranch.sortedParentNodes.length - 1
            ];
        const activeNode = viewState.document.activeNode;
        const alignBranchSettings = matchActionToSettings(settings, action);

        this.updateLastBehavior(alignBranchSettings);

        const context: AlignBranchContext = {
            activeBranch: viewState.document.activeBranch,
            activeNode,
            viewState,
            documentState,
            container,
            containerRect: container.getBoundingClientRect(),
            settings: alignBranchSettings,
            isNewGroup:
                !this.state.previousGroupId ||
                this.state.previousGroupId !== newGroupId,
            isChildOfPreviousNode: this.state.previousNodeId === parentNodeId,
            isParentOfPreviousNode: this.state.previousGroupId === activeNode,
            alignInactiveColumns: params.alignInactiveColumns,
            state: {
                columns: new Set<string>(),
            },
        };
        return context;
    };

    private updateState(
        context: AlignBranchContext,
        action: PluginAction | undefined,
    ) {
        if (
            action?.type === 'view/life-cycle/mount' ||
            action?.type === 'view/align-branch'
        ) {
            this.state.previousGroupId = '';
            this.state.previousNodeId = '';
        } else {
            this.state.previousGroupId =
                context.viewState.document.activeBranch.group;
            this.state.previousNodeId = context.activeNode;
        }
    }

    private updateLastBehavior(alignBranchSettings: AlignBranchSettings) {
        if (!this.state.previousBehavior) {
            this.state.previousBehavior = alignBranchSettings.behavior;
        } else if (
            this.state.previousBehavior !== alignBranchSettings.behavior
        ) {
            const timeSinceLastBehavior =
                Date.now() - this.state.previousBehaviorTime;
            if (timeSinceLastBehavior < 1000) {
                alignBranchSettings.behavior = this.state.previousBehavior;
            } else {
                this.state.previousBehavior = alignBranchSettings.behavior;
            }
        }
        this.state.previousBehaviorTime = Date.now();
    }
}
