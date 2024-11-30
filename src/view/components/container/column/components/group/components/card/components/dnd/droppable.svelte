<script lang="ts">
    import { getView } from '../../../../../../../context';
    import { droppable } from 'src/view/actions/dnd/droppable';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Bridges from '../bridges/bridges.svelte';
    import clx from 'classnames';
    import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

    export let nodeId: string;
    export let active: ActiveStatus | null;
    export let hasChildren: boolean;
    export let parentId: string;
    export let editing: boolean;
    export let disableEditConfirmation: boolean;
    export let selected: boolean;
    const view = getView();
    // eslint-disable-next-line no-undef
    const setActive = (e: MouseEvent) => {
        if (editing) return;
        const cursor = view.container!.style.cursor;
        if (cursor === 'grab') return;

        viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: { id: nodeId },
            context: {
                modKey: isMacLike ? e.metaKey : e.ctrlKey,
                source: 'mouse',
            },
        });
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
        disableEditConfirmation
            ? 'node-border--discard'
            : editing
              ? 'node-border--editing'
              : selected
                ? 'node-border--selected'
                : active === ActiveStatus.node
                  ? 'node-border--active'
                  : undefined,
    )}
    id={nodeId}
    on:click={setActive}
    on:dblclick={(e) => {
        setActive(e);
        viewStore.dispatch({
            type: 'DOCUMENT/ENABLE_EDIT_MODE',
            payload: {
                nodeId,
            },
        });
    }}
    use:droppable={{ viewStore, documentStore }}
>
    <slot />
    <Bridges {active} {editing} {hasChildren} {parentId} />
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
        border-left: 5px var(--color-red) solid;
    }

    .node-border--selected {
        border-left: 5px var(--lineage-color-selection) solid;
    }
</style>
