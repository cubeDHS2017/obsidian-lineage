<script lang="ts">
    import { PinnedNodesStore } from '../../../../stores/document/derived/pinned-nodes-store';
    import { getView } from '../context';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import Node from 'src/view/components/container/column/components/group/components/card/card.svelte';
    import { documentStateStore } from 'src/stores/view/derived/editing-store';
    import { IdSectionStore } from 'src/stores/document/derived/id-section-store';
    import { ActivePinnedCardStore } from 'src/stores/view/derived/pinned-cards-sidebar';

    const view = getView();
    const pinnedNodesArray = PinnedNodesStore(view);

    const idSection = IdSectionStore(view);
    const editingStateStore = documentStateStore(view);

    const activePinnedCard = ActivePinnedCardStore(view);
</script>

<div class="pinned-cards-container">
    <div class="sidebar-buffer" />
    {#each $pinnedNodesArray as node (node)}
        <Node
            {node}
            active={$activePinnedCard === node
                ? ActiveStatus.node
                : ActiveStatus.sibling}
            editing={$editingStateStore.activeNodeId === node &&
                $editingStateStore.isInSidebar === true}
            disableEditConfirmation={$editingStateStore.activeNodeId === node &&
                $editingStateStore.disableEditConfirmation &&
                $editingStateStore.isInSidebar === true}
            isInSidebar={true}
            firstColumn={true}
            section={$idSection[node]}
            hasActiveChildren={false}
            hasChildren={false}
            selected={false}
            pinned={false}
        />
    {/each}
    <div class="sidebar-buffer" />
</div>

<style>
    .pinned-cards-container {
        overflow-y: auto;
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .pinned-cards-container::-webkit-scrollbar {
        display: none;
    }
    .sidebar-buffer {
        min-height: 90%;
        min-width: var(--node-width);
    }
</style>
