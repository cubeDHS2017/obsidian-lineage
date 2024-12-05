<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import { get } from 'svelte/store';
    import {
        LeftSidebarWidthStore,
        ShowLeftSidebarStore,
    } from 'src/stores/settings/derived/view-settings-store';
    import { onDestroy } from 'svelte';

    const MIN_WIDTH = 250;
    // used to animate using CSS transition width, can go to 0
    let animatedSidebarWidth = 0;
    // this width does not go to 0
    let sidebarWidth = MIN_WIDTH;
    let isResizing = false;
    let startX = 0;

    const view = getView();
    const showSidebarStore = ShowLeftSidebarStore(view);

    const unsub = showSidebarStore.subscribe((show) => {
        if (show) {
            animatedSidebarWidth =
                view.plugin.settings.getValue().view.leftSidebarWidth;
            sidebarWidth = animatedSidebarWidth;
        } else {
            animatedSidebarWidth = 0;
        }
    });
    onDestroy(() => {
        unsub();
    });

    // Handle resize logic
    const onStartResize = (event: MouseEvent) => {
        isResizing = true;
        startX = event.clientX;
        view.contentEl.addEventListener('mousemove', onResize);
        view.contentEl.addEventListener('mouseup', onStopResize);
    };

    const onResize = (event: MouseEvent) => {
        if (!isResizing) return;
        const dx = event.clientX - startX;
        animatedSidebarWidth += dx;
        startX = event.clientX;
        if (animatedSidebarWidth > MIN_WIDTH) {
            sidebarWidth = animatedSidebarWidth;
        }
    };

    const onStopResize = () => {
        isResizing = false;
        view.contentEl.removeEventListener('mousemove', onResize);
        view.contentEl.removeEventListener('mouseup', onStopResize);


        if (animatedSidebarWidth < MIN_WIDTH) {
            animatedSidebarWidth = MIN_WIDTH;
        }
        sidebarWidth = animatedSidebarWidth;
        view.plugin.settings.dispatch({
            type: 'view/left-sidebar/set-width',
            payload: {
                width: animatedSidebarWidth,
            },
        });
    };
</script>

<div
    class={'sidebar' + (isResizing ? '' : ' width-transition')}
    style="--animated-sidebar-width: {animatedSidebarWidth}px; --sidebar-width: {sidebarWidth}px; }"
>
    <div class="resizer" on:mousedown={onStartResize} />
    <slot />
    {#if animatedSidebarWidth > 0}{/if}
</div>

<style>
    .sidebar {
        --node-width: calc(var(--sidebar-width) - 50px);
        flex: 0 0 auto;
        width: var(--animated-sidebar-width);
        position: relative;
        overflow: hidden;
        background-color: var(--color-base-20);
    }
    .width-transition {
        transition: width 0.3s ease;
    }

    .resizer {
        position: absolute;
        top: 0;
        height: 100%;
        bottom: 0;
        background-color: transparent;
        transition: background-color 0.2s;
        cursor: col-resize;
        right: 0px;
        width: 4px;
    }

    .resizer:hover {
        background-color: var(--color-accent);
    }
</style>
