<script lang="ts">
    import { Minus as ZoomOut, Plus as ZoomIn, RotateCcw, RotateCw, ScanSearch } from 'lucide-svelte';
    import { getView } from '../../context';
    import Button from '../../shared/button.svelte';
    import { zoomLevelStore } from 'src/stores/view/derived/zoom-level-store';
    import { maxZoomLevel, minZoomLevel } from 'src/stores/settings/reducers/change-zoom-level';
    import { createZoomMenu } from 'src/view/components/container/controls-bar/components/helpers/create-zoom-menu';
    import { get } from 'svelte/store';
    import { KeyboardStore } from 'src/stores/view/derived/keyboard-store';

    export let showControls: boolean;

    const view = getView();
    const keyboardStore = KeyboardStore(view);

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

    let zoomValueBeforeReset = -1;
    const restoreZoom = () => {
        if (zoomValueBeforeReset === -1) {
            zoomValueBeforeReset = get(zoomLevelStore(view));
            view.plugin.settings.dispatch({
                type: 'UI/CHANGE_ZOOM_LEVEL',
                payload: { value: 1 },
            });
        } else {
            view.plugin.settings.dispatch({
                type: 'UI/CHANGE_ZOOM_LEVEL',
                payload: { value: zoomValueBeforeReset },
            });
            zoomValueBeforeReset = -1;
        }
    };

    const zoomLevel = zoomLevelStore(view);

    const zoomMenuState = {
        menuHeight: 0,
        menuWidth: 0,
        lastMenuHideEvent_ms: 0,
    };

    const showZoomPopupMenu = async (event: MouseEvent) => {
        // to prevent the click event from hiding and re-showing the menu immediately
        if (Date.now() - zoomMenuState.lastMenuHideEvent_ms < 100) return;

        createZoomMenu({
            event: event,
            view,
            state: zoomMenuState,
        });
    };
</script>

<div class="buttons-group buttons-group--vertical" data-visible={showControls}>
    <Button
        classes="control-item"
        disabled={$zoomLevel >= maxZoomLevel}
        label="zoom in"
        on:click={zoomIn}
        tooltipPosition="left"
    >
        <ZoomIn class="svg-icon" />
    </Button>
    <Button
        classes="control-item"
        disabled={$keyboardStore.shift
            ? zoomValueBeforeReset === -1
            : $zoomLevel === 1}
        label={'Reset zoom (hold shift to undo)'}
        active={$keyboardStore.shift
            ? zoomValueBeforeReset !== -1
            : $zoomLevel !== 1}
        on:click={restoreZoom}
        tooltipPosition="left"
    >
        {#if $keyboardStore.shift}
            <RotateCw class="svg-icon" />
        {:else}
            <RotateCcw class="svg-icon" />
        {/if}
    </Button>

    <Button
        classes="control-item"
        label="Fit document height into view"
        on:click={showZoomPopupMenu}
        tooltipPosition="left"
    >
        <ScanSearch class="svg-icon" />
    </Button>
    <Button
        classes="control-item"
        disabled={$zoomLevel <= minZoomLevel}
        label="Zoom out"
        on:click={zoomOut}
        tooltipPosition="left"
    >
        <ZoomOut class="svg-icon" />
    </Button>
</div>
