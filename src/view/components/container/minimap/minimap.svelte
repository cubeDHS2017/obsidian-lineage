<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import Indicators from './components/indicators.svelte';
    import { onCanvasClick } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
    import { onCanvasWheel } from 'src/view/components/container/minimap/event-handlers/on-canvas-wheel';
    import {
        createOnCanvasMousemove
    } from 'src/view/components/container/minimap/event-handlers/create-on-canvas-mousemove';
    import { onMount } from 'svelte';
    import { OnError, Store } from 'src/lib/store/store';
    import { defaultMinimapState } from 'src/stores/minimap/default-minimap-state';
    import { minimapReducer } from 'src/stores/minimap/minimap-reducer';
    import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';
    import { minimapSubscriptions } from 'src/stores/minimap/subscriptions/minimap-subscriptions';
    import {
        MinimapScrollOffsetStore,
        ScrollThumbHeightStore,
        ScrollThumbPositionStore
    } from 'src/stores/minimap/derived/scrollbar-stores';

    const view = getView();
    view.minimapStore = new Store(
        defaultMinimapState(),
        minimapReducer,
        this.onViewStoreError as OnError<MinimapStoreAction>,
    );

    const onClick = (e: MouseEvent) => onCanvasClick(e, view);
    const onWheel = (e: WheelEvent) => onCanvasWheel(e, view);
    const onMousemove = createOnCanvasMousemove(view);

    onMount(() => {
        let unsub: (() => void) | null = null;
        setTimeout(() => {
            unsub = minimapSubscriptions(view);
        }, 300);


        return () => {
            if (unsub) unsub();
        };
    });

    const thumbHeight = ScrollThumbHeightStore(view);
    const thumbPosition = ScrollThumbPositionStore(view);
    const containerOffset = MinimapScrollOffsetStore(view);

</script>

<div class="minimap-container" on:wheel={onWheel}>
    <div
        class="canvas-container"
        on:click={onClick}
        on:mousemove={onMousemove}
        style={`transform: translateY(${$containerOffset}px)`}
    >
        <Indicators />
        <canvas id="minimap"></canvas>
    </div>
    <div
        class="scroll-indicator"
        id="scrollIndicator"
        style={`height: ${$thumbHeight}px; transform: translateY(${$thumbPosition}px)`}
    ></div>
</div>

<style>
    :root {
        --scroll-indicator-color: rgba(255, 255, 255, 0.2);
    }

    .minimap-container {
        position: relative;
        height: 100%;
        width: 184px;
        padding: 4px;
        background: var(--background-primary);
        overflow: hidden;
        flex: 0 0 auto;
    }

    canvas {
        width: 176px;
        margin-right: 4px;
    }

    .canvas-container {
        transition: transform 0.1s ease-out;
        width: 176px;
    }

    .scroll-indicator {
        position: absolute;
        right: 0;
        top: 0;
        width: 4px;
        background: var(--color-base-50);
        border-radius: 2px;
        transition: transform 0.1s ease-out;
    }
</style>
