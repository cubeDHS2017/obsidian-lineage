<script lang="ts">
    import Group from './components/group/group.svelte';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndY } from 'src/view/actions/dnd/scroll-on-dnd-y';
    import { groupsStore } from 'src/stores/document/derived/groups-store';

    export let columnId: string;
    export let activeChildGroups: Set<string>;
    export let dndChildGroups: Set<string>;
    export let selectedNodes: Set<string>;
    export let parentNodes: Set<string>;
    export let activeGroup: string;
    export let activeNode: string;
    export let editedNode: string;
    export let disableEditConfirmation: boolean;
    export let searchQuery: string;
    export let searchResults: Set<string>;
    export let bookmarks: Set<string>;
    export let groupParentIds: Set<string>;
    export let searching: boolean;
    export let idSection: Record<string,string>;

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
                {editedNode}
                {disableEditConfirmation}
                {searchQuery}
                {searchResults}
                {searching}
                {activeChildGroups}
                {activeNode}
                {idSection}
                {selectedNodes}
                {bookmarks}
                {groupParentIds}
            />
        {/if}
    {/each}
    <div class="column-buffer" />
</div>

<style>
    .column {
        min-width: fit-content;
        height: 100vh;
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
