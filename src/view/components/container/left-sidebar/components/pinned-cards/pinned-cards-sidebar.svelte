<script lang="ts">
    import { PinnedNodesStore } from '../../../../../../stores/document/derived/pinned-nodes-store';
    import { getView } from '../../../context';
    import { ActiveStatus } from '../../../column/components/group/components/active-status.enum';
    import Node from '../../../column/components/group/components/card/card.svelte';
    import { documentStateStore } from '../../../../../../stores/view/derived/editing-store';
    import { IdSectionStore } from '../../../../../../stores/document/derived/id-section-store';
    import { ActivePinnedCardStore } from '../../../../../../stores/view/derived/pinned-cards-sidebar';
    import NoItems from '../no-items/no-items.svelte';
    import { PendingConfirmationStore } from 'src/stores/view/derived/pending-confirmation';
    import { NodeStylesStore } from 'src/stores/view/derived/style-rules';
    import {
        scrollActivePinnedNode
    } from 'src/view/components/container/left-sidebar/components/pinned-cards/actions/scroll-active-pinned-node';

    const view = getView();
    const pinnedNodesArray = PinnedNodesStore(view);

    const idSection = IdSectionStore(view);
    const editingStateStore = documentStateStore(view);

    const activePinnedCard = ActivePinnedCardStore(view);
    const pendingConfirmation = PendingConfirmationStore(view);
    const styleRules = NodeStylesStore(view);


</script>

<div class="pinned-cards-container" use:scrollActivePinnedNode>
    {#if $pinnedNodesArray.length > 0}
        {#each $pinnedNodesArray as node (node)}
            <Node
                {node}
                active={$activePinnedCard === node
                    ? ActiveStatus.node
                    : ActiveStatus.sibling}
                editing={$editingStateStore.activeNodeId === node &&
                    $editingStateStore.isInSidebar === true}
                confirmDisableEdit={$editingStateStore.activeNodeId === node &&
                    $pendingConfirmation.disableEdit === node &&
                    $editingStateStore.isInSidebar === true}
                confirmDelete={$pendingConfirmation.deleteNode.has(node)}
                isInSidebar={true}
                firstColumn={true}
                section={$idSection[node]}
                hasActiveChildren={false}
                hasChildren={false}
                selected={false}
                pinned={false}
                style={$styleRules.get(node)}
                singleColumnMode={false}
            />
        {/each}
    {:else}
        <NoItems variant="pinned" />
    {/if}
</div>

<style>
    .pinned-cards-container {
        overflow-y: auto;
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        flex: 1 1 auto;
        padding-bottom: 10px;
    }
</style>
