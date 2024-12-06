<script lang="ts">
    import { PinnedNodesStore } from '../../../../../../stores/document/derived/pinned-nodes-store';
    import { getView } from '../../../context';
    import { ActiveStatus } from '../../../column/components/group/components/active-status.enum';
    import Node from '../../../column/components/group/components/card/card.svelte';
    import { documentStateStore } from '../../../../../../stores/view/derived/editing-store';
    import { IdSectionStore } from '../../../../../../stores/document/derived/id-section-store';
    import { ActivePinnedCardStore } from '../../../../../../stores/view/derived/pinned-cards-sidebar';
    import {
        scrollCardIntoView
    } from 'src/view/components/container/left-sidebar/components/recent-cards/helpers/scroll-card-into-view';
    import { onDestroy } from 'svelte';

    let containerRef: HTMLElement | null = null;
    const view = getView();
    const pinnedNodesArray = PinnedNodesStore(view);

    const idSection = IdSectionStore(view);
    const editingStateStore = documentStateStore(view);

    const activePinnedCard = ActivePinnedCardStore(view);

    const subscriptions: (() => void)[] = [];
    subscriptions.push(
        ActivePinnedCardStore(view).subscribe((activeNodeId) => {
            setTimeout(() => {
                if (!containerRef) return;
                if (!activeNodeId) return;
                scrollCardIntoView(containerRef, activeNodeId);
            }, 200);
        }),
    );
    subscriptions.push(
        PinnedNodesStore(view).subscribe(() => {
            setTimeout(() => {
                if (!containerRef) return;
                const activeNodeId = view.viewStore.getValue().pinnedNodes.activeNode;
                if (!activeNodeId) return;
                scrollCardIntoView(containerRef, activeNodeId);
            }, 200);
        }),
    );
    onDestroy(() => {
        for (const unsub of subscriptions) {
            unsub();
        }
    });
</script>

<div class="pinned-cards-container"  bind:this={containerRef}>
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
        flex: 1 1 auto;
        padding-bottom: 10px;
    }


</style>
