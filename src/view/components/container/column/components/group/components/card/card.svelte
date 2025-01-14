<script lang="ts">
    import { NodeId } from 'src/stores/document/document-state-type';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Draggable from './components/dnd/draggable.svelte';
    import InlineEditor from './components/content/inline-editor.svelte';
    import Content from './components/content/content.svelte';
    import CardButtons
        from 'src/view/components/container/column/components/group/components/card/components/card-buttons/card-buttons/card-buttons.svelte';
    import { NodeStyle } from 'src/stores/view/view-state-type';
    import clx from 'classnames';
    import Bridges
        from 'src/view/components/container/column/components/group/components/card/components/bridges/bridges.svelte';
    import { droppable } from 'src/view/actions/dnd/droppable';

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
    export let singleColumnMode: boolean;
    export let collapsed: boolean;
    export let hidden: boolean;
    const activeStatusClasses = {
        [ActiveStatus.node]: 'active-node',
        [ActiveStatus.child]: 'active-child',
        [ActiveStatus.parent]: 'active-parent',
        [ActiveStatus.sibling]: 'active-sibling',
    };

    let depth = 0;
    $: depth = section ? section.split('.').length - 1 : 0;
</script>

<div
    style={singleColumnMode
        ? `margin-left: calc(var(--node-indentation-width) * ${depth})`
        : ''}
    class={clx(
        'lineage-card',
        hidden? 'hidden-node':'',
        active
            ? activeStatusClasses[active]
            : singleColumnMode
              ? ' active-sibling'
              : ' inactive-node',
        confirmDelete
            ? 'node-border--delete'
            : confirmDisableEdit
              ? 'node-border--discard'
              : editing
                ? 'node-border--editing'
                : selected
                  ? 'node-border--selected'
                  : isSearchMatch
                    ? 'node-border--search-match'
                    : active === ActiveStatus.node
                      ? 'node-border--active'
                      : undefined,
    )}
    id={node}
    use:droppable
>
    {#if active === ActiveStatus.node && editing}
        <InlineEditor nodeId={node} />
    {:else}
        <Draggable nodeId={node} {isInSidebar}>
            <Content nodeId={node} {isInSidebar} {active} />
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
        {collapsed}
    />
    <Bridges {active} {editing} {hasActiveChildren} {firstColumn} />
    {#if style}
        <div
            style={`background-color: ${style.color}`}
            class="node-style-container"
        />
    {/if}
    <!--    <div class="debug-node-id">{node}</div>-->
</div>

<style>
    :root {
        --node-width: 400px;
        --min-node-height: 100px;
    }

    .lineage-card {
        width: var(--node-width);
        height: fit-content;
        display: flex;
        position: relative;
        font-size: 16px;
        --scrollbar-thumb-bg: var(--color-base-30);
        --scrollbar-active-thumb-bg: var(--color-base-40);
    }

    .lineage-card:hover {
        z-index: 10;
    }

    .lineage-card::-webkit-scrollbar {
        display: initial;
    }

    .node-style-container {
        position: absolute;
        width: 5px;
        left: 0;
        height: 100%;
        top: 0;
    }


    /* .node-border--active,
    .node-border--discard,
    .node-border--delete,
    .node-border--selected,
    .node-border--search-match {
        & .node-style-container {
            border-left: 1px solid var(--background-active-node);
        }
    }*/

    /*  .node-border--editing {
        & .node-style-container {
            display: none;
        }
    }*/
    /* .debug-node-id {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 12px;
        color: var(--text-on-accent);
        background-color: var(--color-accent);
    }*/
</style>
