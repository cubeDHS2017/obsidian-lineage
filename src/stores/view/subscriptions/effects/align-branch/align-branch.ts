import { AlignBranchState } from 'src/lib/align-element/align-element-v-and-h';
import { alignParentsNodes } from './helpers/align-parents-nodes';
import { alignChildColumns } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-child-columns/align-child-columns';
import { alignActiveNode } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-active-node';
import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import {
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
    settings: AlignBranchSettings;
    state: AlignBranchState;
    alignInactiveColumns: boolean;
};

export class AlignBranch {
    private state: { previousGroupId: string } = {
        previousGroupId: '',
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

        const container = this.view.container!;
        const documentState = this.view.documentStore.getValue();
        const viewState = this.view.viewStore.getValue();
        const newGroupId = viewState.document.activeBranch.group;

        const context: AlignBranchContext = {
            activeBranch: viewState.document.activeBranch,
            activeNode: viewState.document.activeNode,
            viewState,
            documentState,
            container,
            settings: matchActionToSettings(
                settings,
                this.state.previousGroupId,
                newGroupId,
                action,
            ),
            alignInactiveColumns: params.alignInactiveColumns,
            state: {
                columns: new Set<string>(),
            },
        };

        this.animationFrameHandle = requestAnimationFrame(() => {
            if (params.scrollFirstColumnToTheLeft) {
                scrollFirstColumnToTheLeft(documentState, container);
            }

            if (settings.view.singleColumnMode) {
                this.alignSingleColumn(context);
            } else {
                this.alignActiveBranch(context);
            }
        });
        if (
            action?.type === 'view/life-cycle/mount' ||
            action?.type === 'view/align-branch'
        ) {
            this.state.previousGroupId = '';
        } else {
            this.state.previousGroupId = newGroupId;
        }

        if (params.retry && !isRetry) {
            const activeNode = viewState.document.activeNode;
            await waitForElementToStopMoving(this.view, activeNode);
            this.align(action, true);
        }
    };

    private alignSingleColumn = (context: AlignBranchContext) => {
        alignActiveNode(context);
    };

    private alignActiveBranch = (context: AlignBranchContext) => {
        alignActiveNode(context);
        alignParentsNodes(context);
        alignChildColumns(context);
    };
}
