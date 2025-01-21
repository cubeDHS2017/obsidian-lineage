import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';
import { delayAlign } from 'src/stores/view/subscriptions/effects/align-branch/helpers/delay-align';
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
import { waitForActiveNodeToStopMoving } from 'src/lib/align-element/helpers/wait-for-active-node-to-stop-moving';
import { createContext } from 'src/stores/view/subscriptions/effects/align-branch/helpers/create-context';
import { SilentError } from 'src/lib/errors/errors';
import { actionPriority } from 'src/stores/view/subscriptions/effects/align-branch/constants/action-priority';
import { logger } from 'src/helpers/logger';

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

export class AlignBranch {
    private isRunning: boolean = false;
    private currentEvent: {
        action: PluginAction;
        controller: AbortController;
        priority: number;
    } | null = null;

    private previousActiveBranch: ActiveBranch | null = null;

    constructor(public view: LineageView) {}

    align = (action: PluginAction) => {
        const priority = actionPriority.get(action.type);
        if (typeof priority !== 'number') {
            throw new SilentError(action.type + ' not allowed');
        }

        if (this.currentEvent) {
            if (priority >= this.currentEvent.priority) {
                this.currentEvent.controller.abort();
            } else {
                return;
            }
        }
        this.currentEvent = {
            action,
            priority,
            controller: new AbortController(),
        };
        if (!this.isRunning) {
            this.run();
        }
    };

    private run = async () => {
        this.isRunning = true;
        while (this.currentEvent) {
            const event = this.currentEvent;
            try {
                if (skipAlign(this.view, event.action)) {
                    if (this.currentEvent === event) this.currentEvent = null;
                    continue;
                }

                const delay_ms = delayAlign(event.action);
                if (delay_ms > 0) {
                    await delay(delay_ms, event.controller.signal);
                }

                const context = createContext(
                    this.view,
                    event.action,
                    this.previousActiveBranch,
                );

                const actions = createAlignBranchActions(context, event.action);

                requestAnimationFrame(() => {
                    runAlignBranchActions(
                        context,
                        actions,
                        event.controller.signal,
                    );
                    this.previousActiveBranch = context.activeBranch;
                });
                await waitForActiveNodeToStopMoving(
                    this.view,
                    event.controller.signal,
                );
            } catch (e) {
                logger.error(e);
            }
            if (this.currentEvent === event) this.currentEvent = null;
        }

        this.isRunning = false;
    };
}
