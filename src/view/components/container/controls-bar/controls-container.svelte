<script lang="ts">
    import { lang } from 'src/lang/lang';
    import {
        HistoryIcon,
        Keyboard,
        MoreVertical,
        Palette,
        PanelRightInactive as PanelRight,
        RectangleVertical,
        Redo2 as RedoIcon,
        Settings,
        Undo2 as UndoIcon
    } from 'lucide-svelte';
    import { getView } from '../context';
    import { historyStore } from 'src/stores/document/derived/history-store';
    import { Notice } from 'obsidian';
    import { writable } from 'svelte/store';
    import { uiControlsStore } from 'src/stores/view/derived/ui-controls-store';
    import Button from '../shared/button.svelte';
    import { ScrollSettingsStore, showMinimapStore } from 'src/stores/settings/derived/scrolling-store';
    import { customIcons } from 'src/helpers/load-custom-icons';
    import { ApplyGapBetweenCardsStore, SingleColumnMode } from 'src/stores/settings/derived/view-settings-store';
    import ZoomButtons from './components/zoom-buttons.svelte';

    const view = getView();
    const viewStore = view.viewStore;
    const documentStore = view.documentStore;

    const history = historyStore(view);
    const handleNextClick = () => {
        if (viewStore.getValue().document.editing.activeNodeId)
            new Notice(lang.error_apply_snapshot_while_editing);
        else
            documentStore.dispatch({
                type: 'HISTORY/APPLY_NEXT_SNAPSHOT',
            });
    };

    const handlePreviousClick = () => {
        if (viewStore.getValue().document.editing.activeNodeId)
            new Notice(lang.error_apply_snapshot_while_editing);
        else
            documentStore.dispatch({
                type: 'HISTORY/APPLY_PREVIOUS_SNAPSHOT',
            });
    };

    const toggleHelp = () => {
        viewStore.dispatch({ type: 'UI/TOGGLE_HELP_SIDEBAR' });
    };

    const toggleStyleRules = () => {
        viewStore.dispatch({ type: 'view/modals/toggle-style-rules' });
    };
    const toggleSettings = () => {
        viewStore.dispatch({ type: 'UI/TOGGLE_SETTINGS_SIDEBAR' });
    };

    const controls = uiControlsStore(view);
    const showControls = writable(false);
    const toggleShowControls = () => {
        showControls.update((v) => !v);
    };
    const showMinimap = showMinimapStore(view);
    const toggleMinimap = () => {
        view.plugin.settings.dispatch({
            type: 'VIEW/TOGGLE_MINIMAP',
        });
    };
    const toggleScrollModeH = () => {
        view.plugin.settings.dispatch({
            type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE',
        });
    };
    const toggleScrollModeV = () => {
        view.plugin.settings.dispatch({
            type: 'settings/view/scrolling/toggle-vertical-scrolling-mode',
        });
    };

    const scrollSettingsStore = ScrollSettingsStore(view);

    const applyGapBetweenCards = ApplyGapBetweenCardsStore(view);
    const toggleGap = () => {
        view.plugin.settings.dispatch({
            type: 'view/modes/gap-between-cards/toggle',
        });
    };
    const singleColumnMode = SingleColumnMode(view);
    const toggleSingleColumnMode = () => {
        view.plugin.settings.dispatch({
            type: 'settings/view/modes/toggle-single-column',
        });
    };
</script>

<div class="controls-container">
    <div class="buttons-group controls-toggle">
        <Button
            active={$showControls}
            label={lang.controls_toggle_bar}
            on:click={toggleShowControls}
            tooltipPosition="left"
        >
            <MoreVertical class="svg-icon" />
        </Button>
    </div>

    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$showMinimap}
            classes="control-item"
            label={lang.controls_toggle_minimap}
            on:click={toggleMinimap}
            tooltipPosition="left"
        >
            <PanelRight class="svg-icon" />
        </Button>
    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$controls.showSettingsSidebar}
            classes="control-item"
            label={lang.controls_settings}
            on:click={toggleSettings}
            tooltipPosition="left"
        >
            <Settings class="svg-icon" />
        </Button>
        <Button
            active={$controls.showHelpSidebar}
            classes="control-item"
            label={lang.controls_hotkeys}
            on:click={toggleHelp}
            tooltipPosition="left"
        >
            <Keyboard class="svg-icon" />
        </Button>
        <Button
            active={$controls.showStyleRulesModal}
            classes="control-item"
            label={lang.controls_rules}
            on:click={toggleStyleRules}
            tooltipPosition="left"
        >
            <Palette class="svg-icon" />
        </Button>
    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$singleColumnMode}
            classes="control-item"
            label={lang.controls_single_column}
            on:click={toggleSingleColumnMode}
            tooltipPosition="left"
        >
            <RectangleVertical class="svg-icon" />
        </Button>
        <Button
            active={$applyGapBetweenCards}
            classes="control-item"
            label={lang.controls_gap_between_cards}
            on:click={toggleGap}
            tooltipPosition="left"
        >
            {@html customIcons.gap.svg}
        </Button>

        <Button
            active={$scrollSettingsStore.horizontalScrollingMode ===
                'keep-active-card-at-center'}
            classes="control-item"
            label={lang.controls_toggle_scrolling_mode_horizontal}
            on:click={toggleScrollModeH}
            tooltipPosition="left"
        >
            {@html customIcons.alignH.svg}
        </Button>
        <Button
            active={$scrollSettingsStore.verticalScrollingMode ===
                'keep-active-card-at-center'}
            classes="control-item"
            label={lang.controls_toggle_scrolling_mode_vertical}
            on:click={toggleScrollModeV}
            tooltipPosition="left"
        >
            {@html customIcons.alignV.svg}
        </Button>
    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$controls.showHistorySidebar}
            classes="control-item"
            disabled={$history.items.length === 0}
            label={lang.controls_history}
            on:click={() => {
                viewStore.dispatch({ type: 'UI/TOGGLE_HISTORY_SIDEBAR' });
            }}
            tooltipPosition="left"
        >
            <HistoryIcon class="svg-icon" />
        </Button>

        <Button
            classes="control-item"
            disabled={!$history.state.canGoBack}
            label={lang.controls_history_undo}
            on:click={handlePreviousClick}
            tooltipPosition="left"
        >
            <UndoIcon class="svg-icon" />
        </Button>
        <Button
            classes="control-item"
            disabled={!$history.state.canGoForward}
            label={lang.controls_history_redo}
            on:click={handleNextClick}
            tooltipPosition="left"
        >
            <RedoIcon class="svg-icon" />
        </Button>
    </div>
    <ZoomButtons showControls={$showControls} />
</div>

<style>
    .controls-container {
        right: var(--size-4-2);
        top: var(--size-4-2);
        gap: var(--size-4-2);
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 2;
    }

    .controls-toggle {
        display: none;
    }
    :global(.is-mobile) {
        & .controls-toggle {
            display: block;
        }
        & .buttons-group[data-visible='false'] {
            display: none;
        }
    }
</style>
