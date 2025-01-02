<script lang="ts">
    import { filteredHotkeys } from 'src/stores/hotkeys/derived/filtered-hotkeys';
    import Group from './group.svelte';
    import Front from './front.svelte';
    import NumberOfConflicts from './number-of-conflicts.svelte';
</script>

<div class="lineage-modal lineage-modal--full-height">
    <Front />
    <div class="groups">
        {#each Object.entries($filteredHotkeys) as [groupName, group] (groupName)}
            <Group {groupName} {group} />
        {/each}
    </div>
    <NumberOfConflicts />
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
            width: initial;
        }
    }
</style>
