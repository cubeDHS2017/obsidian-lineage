<script lang="ts">
    import ControlsBar from './controls-bar/controls-container.svelte';
    import Container from './container.svelte';
    import Breadcrumbs from './breadcrumbs/breadcrumbs.svelte';
    import Toolbar from './toolbar/toolbar.svelte';
    import Settings from './controls-bar/modals/settings/settings.svelte';
    import FileHistory from 'src/view/components/container/controls-bar/modals/snapshots-list/file-histoy.svelte';
    import Hotkeys from 'src/view/components/container/controls-bar/modals/hotkeys/hotkeys.svelte';
    import { LineageView } from '../../view';
    import Lineage from '../../../main';
    import { setContext } from 'svelte';
    import { uiControlsStore } from 'src/stores/view/derived/ui-controls-store';
    import { showMinimapStore } from 'src/stores/settings/derived/scrolling-store';
    import { keyboardShortcuts } from 'src/view/actions/keyboard-shortcuts/keyboard-shortcuts';
    import { mouseWheelZoom } from 'src/view/actions/mouse-wheel-zoom';
    import Minimap from './minimap/minimap.svelte';
    import { dragToPan } from 'src/view/actions/drag-to-pan/drag-to-pan';
    import LeftSidebar from './pinned-cards-sidebar/left-sidebar.svelte';
    import PinnedCards from './pinned-cards-sidebar/pinned-cards-sidebar.svelte';

    export let plugin: Lineage;
    export let view: LineageView;
    setContext('plugin', plugin);
    setContext('view', view);
    const controls = uiControlsStore(view);
    const showMinimap = showMinimapStore(view);
</script>

<div class="lineage-view" use:keyboardShortcuts={{ view }} tabindex="0">
    <LeftSidebar >
        <PinnedCards/>
    </LeftSidebar>
    <div class={`lineage-main`} use:mouseWheelZoom={view} use:dragToPan={view}>
        <Container />
        <Toolbar />
        <Breadcrumbs />
        <ControlsBar />
        {#if $controls.showHistorySidebar}
            <FileHistory />
        {:else if $controls.showHelpSidebar}
            <Hotkeys />
        {:else if $controls.showSettingsSidebar}
            <Settings />
        {/if}

    </div>
    {#if $showMinimap}
        <Minimap />
    {/if}
</div>

<style>
    .lineage-main {
        --z-index-breadcrumbs: 10;
        background-color: var(--background-container);
        display: flex;
        height: 100%;
        flex: 1 1 auto;
        width: 0; /* ensures it shrinks properly when the minimap is visible */
        position: relative;
    }

    .lineage-view:not(:focus-within) {
        & .node-border--active {
            border-left-color: var(--lineage-accent-faint);
        }
        & .node-border--editing {
            border-left-color: var(--color-base-40);
        }
        & .node-border--discard {
            border-left-color: #e8314660;
        }
        & .node-border--selected {
            border-left-color: var(--lineage-color-selection-faint);
        }
    }

    .lineage-view {
        display: flex;
        height: 100%;
        width: 100%;
    }
</style>
