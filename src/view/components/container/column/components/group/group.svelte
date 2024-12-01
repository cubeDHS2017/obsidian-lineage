<script lang="ts">
    import Node from './components/card/card.svelte';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import { getView } from 'src/view/components/container/context';
    import clx from 'classnames';
    import { nodesStore } from 'src/stores/document/derived/nodes-store';

    export let groupId: string;
    export let columnId: string;
    export let activeChildGroups: Set<string>;
    export let selectedNodes: Set<string>;
    export let parentNodes: Set<string>;
    export let activeGroup: string;
    export let activeNode: string;
    export let editedNode: string;
    export let disableEditConfirmation: boolean;
    export let searchQuery: string;
    export let searchResults: Set<string>;
    export let bookmarks: Set<string>;
    export let searching: boolean;
    export let idSection: Record<string, string>;
    export let groupParentIds: Set<string>;
    const view = getView();
    const nodes = nodesStore(view, columnId, groupId);
</script>

{#if $nodes.length > 0 && (searchQuery.length === 0 || $nodes.some( (n) => searchResults.has(n), ))}
    <div
        class={clx(
            'group',
            activeChildGroups.has(groupId) && 'group-has-active-parent',
            activeGroup === groupId && 'group-has-active-node',
        )}
        id={'group-' + groupId}
    >
        {#each $nodes as node (node)}
            {#if searchQuery.length === 0 || (!searching && searchResults.has(node))}
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
                    editing={editedNode === node}
                    hasActiveChildren={activeChildGroups.size > 0}
                    hasChildren={groupParentIds.has(node)}
                    parentId={groupId}
                    disableEditConfirmation={editedNode === node &&
                        disableEditConfirmation}
                    section={idSection[node]}
                    selected={selectedNodes.has(node)}
                    bookmarked={bookmarks.has(node)}
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
        gap: var(--cards-gap);
        padding: 8px;
        margin-bottom: 2px;
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
