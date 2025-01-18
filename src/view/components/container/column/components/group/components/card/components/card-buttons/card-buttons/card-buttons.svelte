<script lang="ts">
    import DeleteNodeButton from './components/delete-node-button.svelte';
    import EditNodeButton from './components/edit-node-button.svelte';
    import CreateCardButton from './components/create-card-button.svelte';
    import FocusCardButton from './components/focus-card-button.svelte';
    import CollapseCardButton from './components/collapse-card-button.svelte';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';

    export let editing: boolean;
    export let nodeId: string;
    export let hasChildren: boolean;
    export let isInSidebar = false;
    export let collapsed: boolean;
    export let active: ActiveStatus | null;
    export let alwaysShowCardButtons: boolean;
    export let outlineMode: boolean
</script>

{#if active === ActiveStatus.node || alwaysShowCardButtons}
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
{/if}
{#if outlineMode && hasChildren}
    <CollapseCardButton {nodeId} {collapsed} />
{/if}
<EditNodeButton {editing} {nodeId} {isInSidebar} />
