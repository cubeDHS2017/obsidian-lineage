import { LineageView } from 'src/view/view';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { isEmptyDocument } from 'src/stores/view/subscriptions/helpers/is-empty-document';
import { enableEditMode } from 'src/stores/view/subscriptions/actions/enable-edit-mode';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { applyFontSize } from 'src/stores/view/subscriptions/effects/css-variables/apply-font-size';
import { applyContainerBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-container-bg';
import { applyActiveBranchBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-active-branch-bg';
import { applyCardWidth } from 'src/stores/view/subscriptions/effects/css-variables/apply-card-width';
import { applyZoomLevel } from './effects/css-variables/apply-zoom-level';
import { setInitialActiveNode } from 'src/stores/view/subscriptions/actions/set-initial-active-node';
import { markUnresolvedLinks } from 'src/stores/view/subscriptions/effects/mark-unresolved-links/mark-unresolved-links';
import { attachHoverPreviewListener } from 'src/stores/view/subscriptions/event-listeners/attach-hover-preview-listener';
import { attachWheelScrollListener } from 'src/stores/view/subscriptions/event-listeners/attach-wheel-scroll-listener';
import { applyCardsGap } from 'src/stores/view/subscriptions/effects/css-variables/apply-cards-gap';
import { loadPinnedNodesToDocument } from 'src/stores/view/subscriptions/actions/load-pinned-nodes-to-document';
import { attachCloseModalsListener } from 'src/stores/view/subscriptions/attach-close-modals-listener';
import { applyCardIndentationWidth } from 'src/stores/view/subscriptions/effects/css-variables/apply-card-indentation-width';
import { attachCheckboxListener } from 'src/stores/view/subscriptions/effects/checkbox-listener/attach-checkbox-listener';
import { watchViewSize } from 'src/stores/view/subscriptions/effects/view-size/watch-view-size';

const applySettingsToView = (view: LineageView) => {
    const state = view.plugin.settings.getValue();
    applyFontSize(view, state.view.fontSize);
    applyContainerBg(view, state.view.theme.containerBg);
    applyActiveBranchBg(view, state.view.theme.activeBranchBg);
    applyCardWidth(view, state.view.cardWidth);
    applyCardIndentationWidth(view, state.view.nodeIndentationWidth);
    applyCardsGap(view, state.view.cardsGap);
    if (!view.container) return;
    applyZoomLevel(view, state.view.zoomLevel);
    attachCheckboxListener(view);
};

export const onViewMount = (view: LineageView) => {
    const subscriptions: Set<() => void> = new Set();
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const viewStore = view.viewStore;
    // actions
    if (!view.file) return subscriptions;
    setInitialActiveNode(
        viewStore,
        documentState,
        view.plugin.settings.getValue(),
        view.file.path,
    );
    updateActiveBranch(viewStore, documentState);
    if (view.isActive && isEmptyDocument(documentState.document.content)) {
        enableEditMode(viewStore, documentState);
    }
    view.plugin.statusBar.updateAll(view);
    // effects
    if (view.isActive) focusContainer(view);

    loadPinnedNodesToDocument(view);
    markUnresolvedLinks(view);
    applySettingsToView(view);
    attachHoverPreviewListener(view);
    attachWheelScrollListener(view);
    documentStore.dispatch({ type: 'META/REFRESH_GROUP_PARENT_IDS' });
    attachCloseModalsListener(view);
    view.rulesProcessor.onRulesUpdate();
    view.zoomFactor = view.plugin.settings.getValue().view.zoomLevel;

    view.alignBranch.align({ type: 'view/life-cycle/mount' });
    subscriptions.add(watchViewSize(view));
    return subscriptions;
};
