<script lang="ts">
    import { getView } from '../../../context';
    import { ActiveStatus } from '../../../column/components/group/components/active-status.enum';
    import Node from '../../../column/components/group/components/card/card.svelte';
    import { documentStateStore } from '../../../../../../stores/view/derived/editing-store';
    import { IdSectionStore } from '../../../../../../stores/document/derived/id-section-store';
    import { onDestroy } from 'svelte';
    import { ActiveRecentNodeStore, RecentNodesStore } from 'src/stores/view/derived/recent-nodes';
    import {
        scrollCardIntoView
    } from 'src/view/components/container/left-sidebar/components/recent-cards/helpers/scroll-card-into-view';
    import NoItems from '../no-items/no-items.svelte';

    const view = getView();
    const recentNodes = RecentNodesStore(view);

    let containerRef: HTMLElement | null = null;

    const idSection = IdSectionStore(view);
    const editingStateStore = documentStateStore(view);

    const activePinnedCard = ActiveRecentNodeStore(view);

    const subscriptions: (() => void)[] = [];
    subscriptions.push(
        ActiveRecentNodeStore(view).subscribe((activeNodeId) => {
            setTimeout(() => {
                if (!containerRef) return;
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

<div class="recent-cards-container" bind:this={containerRef}>
    {#if $recentNodes.length > 0}
        {#each $recentNodes as node (node)}
            <Node
                {node}
                active={$activePinnedCard === node
                    ? ActiveStatus.node
                    : ActiveStatus.sibling}
                editing={$editingStateStore.activeNodeId === node &&
                    $editingStateStore.isInSidebar === true}
                disableEditConfirmation={$editingStateStore.activeNodeId ===
                    node &&
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
    {:else}
        <NoItems variant="recent" />
    {/if}
</div>

<style>
    .recent-cards-container {
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
    /* .recent-cards-container::-webkit-scrollbar {
        display: none;
    }*/
</style>
