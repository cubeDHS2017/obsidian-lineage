import { LineageView } from 'src/view/view';
import { updateActiveBranch } from 'src/stores/view/subscriptions/actions/update-active-branch';
import { isEmptyDocument } from 'src/stores/view/subscriptions/helpers/is-empty-document';
import { enableEditMode } from 'src/stores/view/subscriptions/actions/enable-edit-mode';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { alignBranch } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { applyFontSize } from 'src/stores/view/subscriptions/effects/css-variables/apply-font-size';
import { applyContainerBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-container-bg';
import { applyActiveBranchBg } from 'src/stores/view/subscriptions/effects/css-variables/apply-active-branch-bg';
import { applyCardWidth } from 'src/stores/view/subscriptions/effects/css-variables/apply-card-width';
import { applyZoomLevel } from './effects/css-variables/apply-zoom-level';
import { setInitialActiveNode } from 'src/stores/view/subscriptions/actions/set-initial-active-node';
import { markUnresolvedLinks } from 'src/stores/view/subscriptions/effects/mark-unresolved-links/mark-unresolved-links';
import { attachHoverPreviewListener } from 'src/stores/view/subscriptions/event-listeners/attach-hover-preview-listener';
import { attachWheelScrollListener } from 'src/stores/view/subscriptions/event-listeners/attach-wheel-scroll-listener';
import { applyColumnsGap } from 'src/stores/view/subscriptions/effects/css-variables/apply-columns-gap';
import { applyCardsGap } from 'src/stores/view/subscriptions/effects/css-variables/apply-cards-gap';
import { loadPinnedNodesToDocument } from 'src/stores/view/subscriptions/actions/load-pinned-nodes-to-document';
import { attachCloseModalsListener } from 'src/stores/view/subscriptions/attach-close-modals-listener';
import { updateViewStyleRules } from 'src/stores/view/subscriptions/effects/style-rules/update-view-style-rules';

const applySettingsToView = (view: LineageView) => {
    const state = view.plugin.settings.getValue();
    applyFontSize(view, state.view.fontSize);
    applyContainerBg(view, state.view.theme.containerBg);
    applyActiveBranchBg(view, state.view.theme.activeBranchBg);
    applyCardWidth(view, state.view.cardWidth);
    applyColumnsGap(view, state.view.columnsGap);
    applyCardsGap(view, state.view.cardsGap);
    if (!view.container) return;
    applyZoomLevel(view, state.view.zoomLevel);
};

export const onViewMount = (view: LineageView) => {
    const documentStore = view.documentStore;
    const documentState = documentStore.getValue();
    const viewStore = view.viewStore;
    // actions
    if (!view.file) return;
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
    alignBranch(view, { type: 'view/life-cycle/mount' });

    loadPinnedNodesToDocument(view);
    markUnresolvedLinks(view);
    applySettingsToView(view);
    attachHoverPreviewListener(view);
    attachWheelScrollListener(view);
    documentStore.dispatch({ type: 'META/REFRESH_GROUP_PARENT_IDS' });
    attachCloseModalsListener(view);
    updateViewStyleRules(view);
    view.zoomFactor = view.plugin.settings.getValue().view.zoomLevel;
};
