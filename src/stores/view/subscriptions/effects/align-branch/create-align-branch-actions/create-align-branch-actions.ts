import { ScrollingSettings } from 'src/stores/settings/settings-type';
import { forceCenterActiveNodeV } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/force-center-active-node-v';
import { lazyVerticalScrollingMode } from 'src/stores/view/subscriptions/effects/align-branch/create-align-branch-actions/lazy-vertical-scrolling-mode';
import { ActiveBranch } from 'src/stores/view/default-view-state';
import {
    AlignBranchContext,
    PluginAction,
} from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

export type AlignBranchAction = {
    action:
        | '10/first-column/horizontal/move-to-the-left'
        | '20/active-node/vertical/center'
        | '20/active-node/vertical/reveal'
        | '20/active-node/vertical/align-with-parent'
        | '20/active-node/horizontal/center'
        | '20/active-node/horizontal/reveal'
        | '30/parents/vertical/center'
        | '30/parents/vertical/align-with-active-node'
        | '40/children/vertical/center'
        | '40/children/vertical/align-with-active-node'
        | '50/inactive-columns/vertical/move-up';
};

export type Props = {
    settings: ScrollingSettings;
    singleColumnMode: boolean;
    action: PluginAction | undefined;
    activeBranch: ActiveBranch;
    previousActiveBranch: ActiveBranch | null;
};
export const createAlignBranchActions = (
    context: AlignBranchContext,
    action: PluginAction,
) => {
    const actions: AlignBranchAction[] = [];
    const settings = context.settings;
    const _forceCenterActiveNodeV = forceCenterActiveNodeV(
        action,
        context.singleColumnMode,
    );

    if (action.type === 'view/align-branch/reveal-node') {
        actions.push({ action: '20/active-node/vertical/reveal' });
        actions.push({ action: '20/active-node/horizontal/reveal' });
        return actions;
    }

    if (context.singleColumnMode) {
        if (_forceCenterActiveNodeV) {
            actions.push({ action: '20/active-node/horizontal/center' });
            actions.push({ action: '20/active-node/vertical/center' });
        } else {
            if (settings.centerActiveNodeH) {
                actions.push({ action: '20/active-node/horizontal/center' });
            } else {
                actions.push({ action: '20/active-node/horizontal/reveal' });
            }
            if (settings.centerActiveNodeV) {
                actions.push({ action: '20/active-node/vertical/center' });
            } else {
                actions.push({ action: '20/active-node/vertical/reveal' });
            }
        }
        return actions;
    }

    if (settings.centerActiveNodeH) {
        actions.push({ action: '20/active-node/horizontal/center' });
    } else {
        actions.push({ action: '20/active-node/horizontal/reveal' });
    }

    if (settings.centerActiveNodeV || _forceCenterActiveNodeV) {
        actions.push({ action: '20/active-node/vertical/center' });
        actions.push({ action: '30/parents/vertical/center' });
        actions.push({ action: '40/children/vertical/center' });
    } else {
        actions.push(...lazyVerticalScrollingMode(context, action));
    }

    if (
        action.type === 'DOCUMENT/SPLIT_NODE' ||
        action.type === 'view/life-cycle/mount' ||
        action.type === 'DOCUMENT/LOAD_FILE'
    ) {
        actions.push({ action: '50/inactive-columns/vertical/move-up' });
    }
    if (
        !settings.centerActiveNodeH &&
        (action.type === 'view/life-cycle/mount' ||
            action.type === 'UI/CHANGE_ZOOM_LEVEL')
    ) {
        actions.push({
            action: '10/first-column/horizontal/move-to-the-left',
        });
    }
    return actions.sort((a, b) => a.action.localeCompare(b.action));
};
