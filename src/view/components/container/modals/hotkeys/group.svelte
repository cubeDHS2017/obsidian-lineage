<script lang="ts">
    import Hotkey from './components/command.svelte';
    import { StatefulViewCommand } from '../../../../actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
    import {
        DynamicLabelState
    } from 'src/view/components/container/modals/hotkeys/components/helpers/get-dynamic-label';

    export let group: StatefulViewCommand[];
    export let labelState: DynamicLabelState;

    export let groupName: string;
</script>
<div class="hotkey-group">
    <div class="hotkey-group-name">{groupName}</div>
    <div class="hotkeys-list">
        {#each group as commandHotkeys (commandHotkeys.name)}
            <Hotkey {commandHotkeys} {labelState} />
        {/each}
    </div>
</div>

<style>
    .hotkey-group {
        background-color: var(--background-secondary);
        padding: var(--size-4-2);
        border-radius: 3px;
    }
    .hotkeys-list {
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        overflow-y: auto;
    }

    .hotkey-group-name {
        padding-bottom: 10px;
        padding-left: 5px;
        font-size: 16px;
        color: var(--color-base-70);
    }
</style>
