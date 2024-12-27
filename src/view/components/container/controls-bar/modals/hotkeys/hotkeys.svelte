<script lang="ts">
    import { filteredHotkeys } from 'src/stores/hotkeys/derived/filtered-hotkeys';
    import Group from './group.svelte';
    import Front from './front.svelte';
    import NumberOfConflicts from './number-of-conflicts.svelte';
</script>

<div class="lineage-modal">
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
        min-width: 430px;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        max-height: 70vh;
        overflow-y: auto;
    }
    @media (max-width: 720px) {
        .groups {
            min-width: unset;
        }
    }
</style>
