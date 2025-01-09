<script lang="ts">
    import Group from './group.svelte';
    import Front from './front.svelte';
    import NumberOfConflicts from './number-of-conflicts.svelte';
    import { FilteredHotkeysStore } from 'src/stores/settings/derived/view-hotkeys-store';
    import { getView } from 'src/view/components/container/context';

    const view = getView();
    const store =FilteredHotkeysStore(view)
</script>

<div class="lineage-modal lineage-modal--full-height">
    <Front />
    <div class="groups">
        {#each Object.entries($store.hotkeys) as [groupName, group] (groupName)}
            <Group {groupName} {group} />
        {/each}
    </div>
    <NumberOfConflicts conflicts={$store.numberOfConflictingHotkeys}/>
</div>

<style>
    .groups {
        width:500px;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        overflow-y: auto;
        flex:1
    }
    @media (max-width: 720px) {
        .groups {
            width: fit-content;
        }
    }
</style>
