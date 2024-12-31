<script lang="ts">
    import { Minus as ZoomOut, Plus as ZoomIn, RotateCcw, ScanSearch } from 'lucide-svelte';
    import { getView } from '../../context';
    import Button from '../../shared/button.svelte';
    import { zoomLevelStore } from 'src/stores/view/derived/zoom-level-store';
    import { maxZoomLevel, minZoomLevel } from 'src/stores/settings/reducers/change-zoom-level';
    import {
        fitDocumentHeightIntoView
    } from 'src/view/components/container/controls-bar/components/helpers/fit-document-height-into-view';
    import {
        fitBranchIntoView
    } from 'src/view/components/container/controls-bar/components/helpers/fit-branch-into-view';
    import { createZoomMenu } from 'src/view/components/container/controls-bar/components/helpers/create-zoom-menu';

    export let showControls: boolean;

    const view = getView();

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

    const zoomLevel = zoomLevelStore(view);

    const state = {
        menuHeight: 0,
        menuWidth: 0,
        lastMenuHideEvent_ms: 0,
    };

    const showZoomPopupMenu = async (event: MouseEvent) => {
        // to prevent the click event from hiding and re-showing the menu immediately
        if (Date.now() - state.lastMenuHideEvent_ms < 100) return;

        createZoomMenu({
            event: event,
            view,
            fitDocumentScale:await fitDocumentHeightIntoView(view),
            fitBranchScale: await fitBranchIntoView(view),
            state,
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
        disabled={$zoomLevel === 1}
        label="Restore zoom level"
        active={$zoomLevel !== 1}
        on:click={restoreZoom}
        tooltipPosition="left"
    >
        <RotateCcw class="svg-icon" />
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
