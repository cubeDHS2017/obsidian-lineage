<script lang="ts">
    import { getView } from '../../../../../../../context';
    import { droppable } from 'src/view/actions/dnd/droppable';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Bridges from '../bridges/bridges.svelte';
    import clx from 'classnames';
    import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';
    import { setActiveSidebarNode } from 'src/stores/view/subscriptions/actions/set-active-sidebar-node';

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
</script>

<div
    class={clx(
        'lineage-card',
        active ? activeStatusClasses[active] : ' inactive-node',
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
        border-left: 5px #FF3B3B solid;
    }

    .node-border--delete{
        border-left: 5px #FF7B4D solid;
    }
    .node-border--selected {
        border-left: 5px var(--lineage-color-selection) solid;
    }
    .node-border--search-match {
        border-left: 5px #FFC857  solid;
    }
</style>
