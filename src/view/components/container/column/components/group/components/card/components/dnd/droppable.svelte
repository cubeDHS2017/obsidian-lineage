<script lang="ts">
    import { getView } from '../../../../../../../context';
    import { droppable } from 'src/view/actions/dnd/droppable';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Bridges from '../bridges/bridges.svelte';
    import clx from 'classnames';
    import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';
    import { setActiveSidebarNode } from 'src/stores/view/subscriptions/actions/set-active-sidebar-node';
    import { NodeStyle } from 'src/stores/view/view-state-type';

    export let nodeId: string;
    export let active: ActiveStatus | null;
    export let hasActiveChildren: boolean;
    export let firstColumn: boolean;
    export let editing: boolean;
    export let confirmDisableEdit: boolean;
    export let confirmDelete: boolean;
    export let selected: boolean;
    export let isInSidebar = false;
    export let isSearchMatch = false;
    export let style: NodeStyle | undefined;
    export let section: string | null;
    export let singleColumnMode: boolean;
    const view = getView();
    // eslint-disable-next-line no-undef
    const setActive = (e: MouseEvent) => {
        if (editing) return;
        const cursor = view.container!.style.cursor;
        if (cursor === 'grab') return;
        if (isInSidebar) {
            setActiveSidebarNode(view, nodeId);
        } else {
            viewStore.dispatch({
                type: 'DOCUMENT/SET_ACTIVE_NODE',
                payload: { id: nodeId },
                context: {
                    modKey: isMacLike ? e.metaKey : e.ctrlKey,
                    source: 'mouse',
                },
            });
        }
    };

    const enableEditMode = (e: MouseEvent) => {
        setActive(e);
        const editingState = viewStore.getValue().document.editing;
        const editedNodeId = editingState.activeNodeId;
        if (editedNodeId === nodeId) return;
        if (isInSidebar) {
            viewStore.dispatch({
                type: 'view/sidebar/enable-edit',
                payload: {
                    id: nodeId,
                },
            });
        } else {
            viewStore.dispatch({
                type: 'view/main/enable-edit',
                payload: {
                    nodeId,
                },
            });
        }
    };
    const documentStore = view.documentStore;
    const viewStore = view.viewStore;

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
    id={nodeId}
    on:click={setActive}
    on:dblclick={enableEditMode}
    use:droppable={{ viewStore, documentStore }}
>
    <slot />
    <Bridges {active} {editing} {hasActiveChildren} {firstColumn} />
    {#if style}
        <div
            style={`background-color: ${style.color}`}
            class="node-style-container"
        />
    {/if}
    <!--    <div class="debug-node-id">{nodeId}</div>-->
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
    .lineage-card::-webkit-scrollbar {
        display: initial;
    }
    .node-border--active {
        border-left: 5px var(--lineage-accent) solid;
    }
    .node-border--editing {
        border-left: 5px var(--color-base-70) solid;
    }
    .node-border--discard {
        border-left: 5px #ff3b3b solid;
    }

    .node-border--delete {
        border-left: 5px #ff7b4d solid;
    }
    .node-border--selected {
        border-left: 5px var(--lineage-color-selection) solid;
    }
    .node-border--search-match {
        border-left: 5px #ffc857 solid;
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
