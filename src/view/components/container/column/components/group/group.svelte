<script lang="ts">
    import Node from './components/card/card.svelte';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import { getView } from 'src/view/components/container/context';
    import clx from 'classnames';
    import { nodesStore } from 'src/stores/document/derived/nodes-store';
    import { EditingState } from 'src/stores/view/default-view-state';
    import { PendingDocumentConfirmation } from 'src/stores/view/view-state-type';

    export let groupId: string;
    export let columnId: string;
    export let activeChildGroups: Set<string>;
    export let selectedNodes: Set<string>;
    export let parentNodes: Set<string>;
    export let activeGroup: string;
    export let activeNode: string;
    export let editedNodeState: EditingState;
    export let pendingConfirmation: PendingDocumentConfirmation;
    export let searchQuery: string;
    export let searchResults: Set<string>;
    export let showAllNodes: boolean;
    export let pinnedNodes: Set<string>;
    export let searching: boolean;
    export let idSection: Record<string, string>;
    export let groupParentIds: Set<string>;
    export let firstColumn: boolean;
    const view = getView();
    const nodes = nodesStore(view, columnId, groupId);
</script>

{#if $nodes.length > 0 && (searchQuery.length === 0 || showAllNodes || $nodes.some( (n) => searchResults.has(n), ))}
    <div
        class={clx(
            'group',
            activeChildGroups.has(groupId) && 'group-has-active-parent',
            activeGroup === groupId && 'group-has-active-node',
        )}
        id={'group-' + groupId}
    >
        {#each $nodes as node (node)}
            {#if searchQuery.length === 0 || showAllNodes || (!searching && searchResults.has(node))}
                <Node
                    {node}
                    active={node === activeNode
                        ? ActiveStatus.node
                        : parentNodes.has(node)
                          ? ActiveStatus.parent
                          : activeChildGroups.has(groupId)
                            ? ActiveStatus.child
                            : activeGroup === groupId
                              ? ActiveStatus.sibling
                              : null}
                    editing={editedNodeState.activeNodeId === node &&
                        !editedNodeState.isInSidebar}
                    confirmDisableEdit={editedNodeState.activeNodeId === node &&
                        pendingConfirmation.disableEdit === node &&
                        !editedNodeState.isInSidebar}
                    confirmDelete={pendingConfirmation.deleteNode.has(node)}
                    hasActiveChildren={activeChildGroups.size > 0}
                    hasChildren={groupParentIds.has(node)}
                    section={idSection[node]}
                    selected={selectedNodes.has(node)}
                    pinned={pinnedNodes.has(node)}
                    isSearchMatch={searchResults.has(node)}
                    {firstColumn}
                />
            {/if}
        {/each}
    </div>
{/if}

<style>
    .group {
        display: flex;
        flex-direction: column;
        width: fit-content;
        gap: var(--node-gap);
        padding: 8px;
        margin-bottom: var(--group-gap);
    }
    .group:last-child {
        margin-bottom: 0;
    }
    .group-has-active-node {
    }
    .group-has-active-parent {
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
    }
</style>
