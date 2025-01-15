import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import { delayAlign } from 'src/stores/view/subscriptions/effects/align-branch/helpers/retry-align';
import { ActiveNodesOfColumn } from 'src/stores/view/view-state-type';
import { Column } from 'src/stores/document/document-state-type';
import { adjustScrollBehavior } from 'src/stores/view/subscriptions/effects/align-branch/helpers/adjust-scroll-behavior';
import { ActiveBranch } from 'src/stores/view/default-view-state';
import { createAlignBranchActions } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/create-align-branch-actions';
import { runAlignBranchActions } from 'src/stores/view/subscriptions/effects/align-branch/run-align-branch-actions/run-align-branch-actions';
import { skipAlign } from 'src/stores/view/subscriptions/effects/align-branch/helpers/skip-align';
import { DocumentStoreAction } from 'src/stores/document/document-store-actions';
import {
    ViewDocumentAction,
    ViewStoreAction,
} from 'src/stores/view/view-store-actions';
import { SettingsActions } from 'src/stores/settings/settings-reducer';
import { DocumentsStoreAction } from 'src/stores/documents/documents-store-actions';
import {
    ActionCategory,
    actionCategory,
    actionCategoryPriority,
} from 'src/stores/view/subscriptions/effects/align-branch/constants/action-category';
import { waitForActiveNodeToStopMoving } from 'src/lib/align-element/helpers/wait-for-active-node-to-stop-moving';

export type PartialDOMRect = Pick<DOMRect, 'top' | 'height'>;

export type AlignBranchState = {
    rects: Map<string, PartialDOMRect>;
};

export type AlignBranchSettings = {
    behavior: ScrollBehavior;
    centerActiveNodeH: boolean;
    centerActiveNodeV: boolean;
    zoomLevel: number;
};

export type AlignBranchContext = {
    previousActiveBranch: ActiveBranch | null;
    columns: Column[];
    activeBranch: ActiveBranch;
    container: HTMLElement;
    containerRect: DOMRect;
    singleColumnMode: boolean;
    settings: AlignBranchSettings;
    state: AlignBranchState;
    activeNodesOfColumn: ActiveNodesOfColumn;
};

export type PluginAction =
    | DocumentStoreAction
    | ViewDocumentAction
    | ViewStoreAction
    | SettingsActions
    | DocumentsStoreAction
    | { type: 'view/life-cycle/mount' }
    | { type: 'view/align-branch/center-node' }
    | { type: 'view/align-branch/reveal-node' };

export type PreviousScrollBehavior = {
    timestamp: number;
    behavior: ScrollBehavior;
};

export type AlignEvent = {
    category: ActionCategory;
    action: PluginAction['type'];
    priority: number;
    ts: number;
};

export class AlignBranch {
    private previousActiveBranch: ActiveBranch | null = null;
    private previousBehavior: PreviousScrollBehavior | null = null;

    private previousEvent: AlignEvent | null = null;
    constructor(public view: LineageView) {}

    align = async (action: PluginAction) => {
        if (skipAlign(this.view, action)) return;

        const delay_ms = delayAlign(action);
        if (delay_ms > 0) await delay(delay_ms);
        await this.waitForPreviousEvent(action);

        const context = this.createContext(action);
        const actions = createAlignBranchActions(context, action);
        requestAnimationFrame(() => {
            runAlignBranchActions(context, actions);
        });
        this.saveActiveBranch(context);
    };

    private createContext = (action?: PluginAction) => {
        const settings = this.view.plugin.settings.getValue();
        const container = this.view.container!;
        const documentState = this.view.documentStore.getValue();
        const viewState = this.view.viewStore.getValue();
        const activeBranch = viewState.document.activeBranch;

        const behavior = action
            ? adjustScrollBehavior(action, this.previousBehavior)
            : 'smooth';

        this.saveBehavior(behavior);

        const context: AlignBranchContext = {
            previousActiveBranch: this.previousActiveBranch,
            activeBranch: activeBranch,
            columns: documentState.document.columns,
            container,
            activeNodesOfColumn: viewState.document.activeNodesOfColumn,
            containerRect: container.getBoundingClientRect(),
            singleColumnMode: settings.view.singleColumnMode,
            settings: {
                centerActiveNodeH: settings.view.scrolling.centerActiveNodeH,
                centerActiveNodeV: settings.view.scrolling.centerActiveNodeV,
                zoomLevel: settings.view.zoomLevel,
                behavior: behavior,
            },
            state: {
                rects: new Map(),
            },
        };
        return context;
    };

    private saveActiveBranch(context: AlignBranchContext) {
        this.previousActiveBranch = context.activeBranch;
    }

    private saveBehavior(behavior: ScrollBehavior) {
        this.previousBehavior = {
            behavior,
            timestamp: Date.now(),
        };
    }

    private waitForPreviousEvent = async (action: PluginAction) => {
        const category = actionCategory.get(action.type)!;
        if (category === 'other') {
            throw new Error('unsupported event: ' + action.type);
        }
        const event: AlignEvent = {
            action: action.type,
            category: category!,
            priority: actionCategoryPriority.get(category)!,
            ts: Date.now(),
        };
        if (this.previousEvent) {
            if (event.priority < this.previousEvent.priority) {
                if (event.ts - this.previousEvent.ts < 500) {
                    await waitForActiveNodeToStopMoving(this.view);
                }
            }
        }
        this.previousEvent = event;
    };
}
