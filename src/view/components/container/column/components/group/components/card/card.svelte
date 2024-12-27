<script lang="ts">
    import { NodeId } from 'src/stores/document/document-state-type';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Draggable from './components/dnd/draggable.svelte';
    import Droppable from './components/dnd/droppable.svelte';
    import InlineEditor from './components/content/inline-editor.svelte';
    import Content from './components/content/content.svelte';
    import CardButtons
        from 'src/view/components/container/column/components/group/components/card/components/card-buttons/card-buttons.svelte';
    import { NodeStyle } from 'src/stores/view/view-state-type';

    export let node: NodeId;
    export let editing: boolean;
    export let active: ActiveStatus | null;
    export let hasActiveChildren: boolean;
    export let hasChildren: boolean;
    export let firstColumn: boolean;
    export let confirmDisableEdit: boolean;
    export let confirmDelete: boolean;
    export let section: string;
    export let selected: boolean;
    export let pinned: boolean;
    export let isInSidebar = false;
    export let isSearchMatch = false;
    export let style: NodeStyle | undefined;
</script>

<Droppable
    {active}
    {confirmDisableEdit}
    {confirmDelete}
    {editing}
    {hasActiveChildren}
    nodeId={node}
    {firstColumn}
    {selected}
    {isInSidebar}
    {isSearchMatch}
    {style}
>
    {#if active === ActiveStatus.node && editing}
        <InlineEditor nodeId={node} />
    {:else}
        <Draggable nodeId={node} {isInSidebar}>
            <Content nodeId={node} />
        </Draggable>
    {/if}
    <CardButtons
        {active}
        {editing}
        nodeId={node}
        {section}
        {pinned}
        {hasChildren}
        {isInSidebar}
    />
</Droppable>



