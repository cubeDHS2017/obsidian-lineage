<script>
    import { lang } from 'src/lang/lang';
    import { maxZoomLevel, minZoomLevel } from 'src/stores/settings/reducers/change-zoom-level';
    import {
        HistoryIcon,
        Keyboard,
        Maximize,
        Minus as ZoomOut,
        MoreVertical,
        Plus as ZoomIn,
        Redo2 as RedoIcon,
        RotateCcw,
        Settings,
        SquareGantt,
        Undo2 as UndoIcon
    } from 'lucide-svelte';
    import { getView } from '../context';
    import { historyStore } from 'src/stores/document/derived/history-store';
    import { Notice } from 'obsidian';
    import { zoomLevelStore } from 'src/stores/view/derived/zoom-level-store';
    import { writable } from 'svelte/store';
    import { uiControlsStore } from 'src/stores/view/derived/ui-controls-store';
    import Button from '../shared/button.svelte';
    import { resetZoom } from 'src/stores/view/subscriptions/effects/align-branch/helpers/reset-zoom';
    import invariant from 'tiny-invariant';
    import {
        getCombinedBoundingClientRect
    } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-combined-client-rect';
    import { ScrollSettingsStore, showMinimapStore } from 'src/stores/settings/derived/scrolling-store';
    import { customIcons } from 'src/helpers/load-custom-icons';

    const view = getView();
    const viewStore = view.viewStore;
    const documentStore = view.documentStore;

    const history = historyStore(view);
    const handleNextClick = () => {
        if (viewStore.getValue().document.editing.activeNodeId)
            new Notice(lang.error_apply_snapshot_while_editing );
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
    const toggleSettings = () => {
        viewStore.dispatch({ type: 'UI/TOGGLE_SETTINGS_SIDEBAR' });
    };

    const zoomIn = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'in' },
        });
    };
    const zoomOut = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'out' },
        });
    };

    const restoreZoom = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { value: 1 },
        });
    };

    const fitDocumentHeightIntoView = () => {
        invariant(view.container);
        resetZoom(view.container);
        const columns = Array.from(
            view.containerEl.querySelectorAll('.column'),
        );
        if (columns.length) {
            const groupHeights = columns
                .map((c) => {
                    return getCombinedBoundingClientRect(
                        Array.from(c.querySelectorAll('.group')),
                    ).height;
                })
                .sort((a,b)=>a-b);
            const height = groupHeights[groupHeights.length-1];
            const width = getCombinedBoundingClientRect(columns).width;

            // eslint-disable-next-line no-undef
            const heightScale = view.container.getBoundingClientRect().height / (height+ 100);
            const widthScale = view.container.getBoundingClientRect().width / (width+ 100);

            const scale =
                Math.min(heightScale,widthScale);
            view.plugin.settings.dispatch({
                type: 'UI/CHANGE_ZOOM_LEVEL',
                payload: { value: scale },
            });
        }
    };
    const zoomLevel = zoomLevelStore(view);
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
    const toggleScrollMode = () => {
        view.plugin.settings.dispatch({
            type: 'VIEW/SCROLLING/TOGGLE_SCROLLING_MODE',
        });
    };

    const scrollSettingsStore = ScrollSettingsStore(view);


</script>

<div class="controls-container">
    <div class="buttons-group controls-toggle">
        <Button
            active={$showControls}
            label={'Toggle controls'}
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
            active={$controls.showSettingsSidebar}
            class="control-item"
            label={'Settings'}
            on:click={toggleSettings}
            tooltipPosition="left"
        >
            <Settings class="svg-icon" />
        </Button>
        <Button
            active={$controls.showHelpSidebar}
            class="control-item"
            label="Keyboard shortcuts"
            on:click={toggleHelp}
            tooltipPosition="left"
        >
            <Keyboard class="svg-icon" />
        </Button>
    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$scrollSettingsStore.horizontalScrollingMode==="keep-active-card-at-center"}
            class="control-item"
            label={lang.toggle_scrolling_mode}
            on:click={toggleScrollMode}
            tooltipPosition="left"
        >
            {@html customIcons.align.svg}
        </Button>
        <Button
            active={$showMinimap}
            class="control-item"
            label={'Toggle minimap'}
            on:click={toggleMinimap}
            tooltipPosition="left"
        >
            <SquareGantt class="svg-icon" />
        </Button>

    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            active={$controls.showHistorySidebar}
            class="control-item"
            disabled={$history.items.length === 0}
            label="History"
            on:click={() => {
                viewStore.dispatch({ type: 'UI/TOGGLE_HISTORY_SIDEBAR' });
            }}
            tooltipPosition="left"
        >
            <HistoryIcon class="svg-icon" />
        </Button>

        <Button
            class="control-item"
            disabled={!$history.state.canGoBack}
            label="Undo"
            on:click={handlePreviousClick}
            tooltipPosition="left"
        >
            <UndoIcon class="svg-icon" />
        </Button>
        <Button
            class="control-item"
            disabled={!$history.state.canGoForward}
            label="Redo"
            on:click={handleNextClick}
            tooltipPosition="left"
        >
            <RedoIcon class="svg-icon" />
        </Button>
    </div>
    <div
        class="buttons-group buttons-group--vertical"
        data-visible={$showControls}
    >
        <Button
            class="control-item"
            disabled={$zoomLevel === maxZoomLevel}
            label="zoom in"
            on:click={zoomIn}
            tooltipPosition="left"
        >
            <ZoomIn class="svg-icon" />
        </Button>
        <Button
            class="control-item"
            disabled={$zoomLevel===1}
            label="Restore zoom level"
            on:click={restoreZoom}
            tooltipPosition="left"
        >
            <RotateCcw class="svg-icon" />
        </Button>
        <Button
            class="control-item"
            label="Fit document height into view"
            on:click={fitDocumentHeightIntoView}
            tooltipPosition="left"
        >
            <Maximize class="svg-icon" />
        </Button>
        <Button
            class="control-item"
            disabled={$zoomLevel === minZoomLevel}
            label="Zoom out"
            on:click={zoomOut}
            tooltipPosition="left"
        >
            <ZoomOut class="svg-icon" />
        </Button>
    </div>
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
    :global(.is-mobile){
        & .controls-toggle {
            display: block;
        }
        & .buttons-group[data-visible='false'] {
            display: none;
        }
    }
</style>
