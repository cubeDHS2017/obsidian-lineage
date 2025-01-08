<script lang="ts">
    import { draggable } from 'src/view/actions/dnd/draggable';

    export let isInSidebar: boolean;
    export let nodeId: string;

</script>

<div class="draggable" use:draggable={{ id: nodeId,isInSidebar }}>
    {#if !isInSidebar}
        <div class="drag-handle"></div>
    {/if}
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .draggable {
        width: 100%;
        background-color: transparent;
        display: flex;
        position: relative;
    }
    .drag-handle {
        height: 100%;
        width: 6px;
        background-color: transparent;
        cursor: grab;
        position: absolute;
        left: 0;
        z-index: 1;
    }
    .draggable:hover .drag-handle {
        background-size: 2px 4px;
        background-image: linear-gradient(
                0deg,
                hsla(0, 0%, 60%, 0.35) 20%,
                transparent 40%
        );
    }
    .content {
        width: 100%
    }
</style>
