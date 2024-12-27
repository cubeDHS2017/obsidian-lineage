<script lang="ts">
    import Group from './components/group/group.svelte';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndY } from 'src/view/actions/dnd/scroll-on-dnd-y';
    import { groupsStore } from 'src/stores/document/derived/groups-store';
    import { EditingState } from 'src/stores/view/default-view-state';
    import { NodeStyle, PendingDocumentConfirmation } from 'src/stores/view/view-state-type';

    export let columnId: string;
    export let activeChildGroups: Set<string>;
    export let dndChildGroups: Set<string>;
    export let selectedNodes: Set<string>;
    export let parentNodes: Set<string>;
    export let activeGroup: string;
    export let activeNode: string;
    export let editedNodeState: EditingState;
    export let pendingConfirmation: PendingDocumentConfirmation;
    export let showAllNodes: boolean;
    export let searchQuery: string;
    export let searchResults: Set<string>;
    export let pinnedNodes: Set<string>;
    export let groupParentIds: Set<string>;
    export let searching: boolean;
    export let idSection: Record<string,string>;
    export let firstColumn: boolean;
    export let styleRules: Map<string, NodeStyle>;
    const view = getView();
    const groups = groupsStore(view, columnId);
</script>

<div class="column" id={columnId} use:scrollOnDndY>
    <div class="column-buffer" />
    {#each $groups as group (group.parentId)}
        {#if !dndChildGroups.has(group.parentId)}
            <Group
                groupId={group.parentId}
                {columnId}
                {parentNodes}
                {activeGroup}
                {editedNodeState}
                {searchQuery}
                {searchResults}
                {showAllNodes}
                {searching}
                {activeChildGroups}
                {activeNode}
                {idSection}
                {selectedNodes}
                {pinnedNodes}
                {groupParentIds}
                {firstColumn}
                {pendingConfirmation}
                {styleRules}
            />
        {/if}
    {/each}
    <div class="column-buffer" />
</div>

<style>
    .column {
        min-width: fit-content;
        height: calc(1/var(--zoom-level) * 100vh);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .column::-webkit-scrollbar {
        display: none;
    }
    .column-buffer {
        height: 90%;
        min-width: var(--node-width);
    }
</style>
