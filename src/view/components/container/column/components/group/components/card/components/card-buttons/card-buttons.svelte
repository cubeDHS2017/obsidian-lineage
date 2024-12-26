<script lang="ts">
    import { ActiveStatus } from '../../../active-status.enum';
    import DeleteNodeButton from './delete-node-button.svelte';
    import EditNodeButton from './edit-node-button.svelte';
    import CreateCardButton from './create-card-button.svelte';
    import TreeIndex from './tree-index-button.svelte';
    import Pin from './pin-indicator.svelte';
    import FocusCardButton from './focus-card-button.svelte';

    export let editing: boolean;
    export let active: ActiveStatus | null;
    export let nodeId: string;
    export let section: string;
    export let pinned: boolean;
    export let hasChildren: boolean;
    export let isInSidebar = false;
</script>

{#if !editing}
    {#if !isInSidebar}
        <CreateCardButton position="up" {nodeId} />
        <CreateCardButton position="right" {nodeId} />
        <CreateCardButton position="down" {nodeId} />

        <DeleteNodeButton {nodeId} />
    {:else}
        <FocusCardButton {nodeId} />
    {/if}
{/if}
<EditNodeButton {editing} {nodeId} {isInSidebar} />
<TreeIndex activeStatus={active} {nodeId} {section} {hasChildren} />
{#if pinned}
    <Pin />
{/if}
