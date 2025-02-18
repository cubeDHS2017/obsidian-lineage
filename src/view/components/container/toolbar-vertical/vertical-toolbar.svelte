<script lang="ts">
    import { lang } from '../../../../lang/lang';
    import { MoreVertical, RotateCcw, RotateCw } from 'lucide-svelte';
    import { getView } from '../context';
    import { historyStore } from '../../../../stores/document/derived/history-store';
    import { derived, get, writable } from 'svelte/store';
    import { uiControlsStore } from '../../../../stores/view/derived/ui-controls-store';
    import Button from '../shared/button.svelte';
    import { ScrollSettingsStore, showMinimapStore } from '../../../../stores/settings/derived/scrolling-store';
    import {
        ApplyGapBetweenCardsStore,
        OutlineModeStore
    } from '../../../../stores/settings/derived/view-settings-store';
    import { KeyboardStore } from '../../../../stores/view/derived/keyboard-store';
    import { zoomLevelStore } from '../../../../stores/view/derived/zoom-level-store';
    import { createZoomMenu } from 'src/view/components/container/toolbar-vertical/helpers/create-zoom-menu';
    import { maxZoomLevel, minZoomLevel } from '../../../../stores/settings/reducers/change-zoom-level';
    import { VerticalToolbarButtonsList } from './vertical-toolbar-buttons-list';
    import { ToolbarButton } from 'src/view/modals/vertical-toolbar-buttons/vertical-toolbar-buttons';

    const view = getView();

    const history = historyStore(view);

    const showControls = writable(false);
    const toggleShowControls = () => {
        showControls.update((v) => !v);
    };

    const controls = uiControlsStore(view);
    const showMinimap = showMinimapStore(view);
    const scrollSettingsStore = ScrollSettingsStore(view);
    const applyGapBetweenCards = ApplyGapBetweenCardsStore(view);
    const outlineMode = OutlineModeStore(view);
    const keyboardStore = KeyboardStore(view);
    const zoomLevel = zoomLevelStore(view);

    const showUndoRestZoomButton = writable(false);
    let zoomValueBeforeReset = -1;
    $: {
        showUndoRestZoomButton.set(
            $keyboardStore.shift && zoomValueBeforeReset !== -1,
        );
    }

    const restoreZoom = () => {
        if (get(showUndoRestZoomButton)) {
            view.plugin.settings.dispatch({
                type: 'UI/CHANGE_ZOOM_LEVEL',
                payload: { value: zoomValueBeforeReset },
            });
            zoomValueBeforeReset = -1;
        } else {
            zoomValueBeforeReset = get(zoomLevelStore(view));
            view.plugin.settings.dispatch({
                type: 'UI/CHANGE_ZOOM_LEVEL',
                payload: { value: 1 },
            });
        }
    };

    const zoomMenuState = {
        menuHeight: 0,
        menuWidth: 0,
        lastMenuHideEvent_ms: 0,
    };

    const showZoomPopupMenu = (event: MouseEvent) => {
        if (Date.now() - zoomMenuState.lastMenuHideEvent_ms < 100) return;

        createZoomMenu({
            event: event,
            view,
            state: zoomMenuState,
        });
    };

    const buttons = VerticalToolbarButtonsList(view, restoreZoom, showZoomPopupMenu);
    const activeStates = derived(
        [
            showMinimap,
            controls,
            scrollSettingsStore,
            outlineMode,
            applyGapBetweenCards,
            zoomLevel,
            showUndoRestZoomButton,
        ],
        ([
            showMinimap,
            controls,
            scrollSettingsStore,
            outlineMode,
            applyGapBetweenCards,
            zoomLevel,
            showUndoRestZoomButton,
        ]) => {
            return ({
                minimap: showMinimap,
                settings: controls.showSettingsSidebar,
                hotkeys: controls.showHelpSidebar,
                'style-rules': controls.showStyleRulesModal,
                'center-active-node-h': scrollSettingsStore.centerActiveNodeH,
                'center-active-node-v': scrollSettingsStore.centerActiveNodeV,
                'outline-mode': outlineMode,
                'space-between-cards': applyGapBetweenCards,
                'zoom-reset': showUndoRestZoomButton
                    ? true
                    : zoomLevel !== 1
            }) as Partial<Record<ToolbarButton, boolean>>;;
        },
    );

    const disabledStates = derived(
        [history, zoomLevel, showUndoRestZoomButton],
        ([history, zoomLevel, showUndoRestZoomButton]) => {
            return {
                'snapshots-list': history.items.length === 0,
                undo: !history.state.canGoBack,
                redo: !history.state.canGoForward,
                'zoom-in': zoomLevel >= maxZoomLevel,
                'zoom-out': zoomLevel <= minZoomLevel,
                'zoom-reset': showUndoRestZoomButton
                    ? false
                    : zoomLevel === 1,
            } as Partial<Record<ToolbarButton, boolean>>;
        },
    );
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

    {#each $buttons as group (group.id)}
        <div
            class="buttons-group buttons-group--vertical"
            data-visible={$showControls}
        >
            {#each group.buttons as button (button.label)}
                <Button
                    active={$activeStates[button.id]}
                    classes="control-item"
                    label={button.label}
                    on:click={button.onClick}
                    tooltipPosition="left"
                    disabled={$disabledStates[button.id]}
                >
                    {#if 'svg' in button.icon}
                        {@html button.icon.svg}
                    {:else if button.id === 'zoom-reset'}
                        {#if $showUndoRestZoomButton}
                            <RotateCw class="svg-icon" />
                        {:else}
                            <RotateCcw class="svg-icon" />
                        {/if}
                    {:else}
                        <svelte:component this={button.icon} class="svg-icon" />
                    {/if}
                </Button>
            {/each}
        </div>
    {/each}
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
