<script lang="ts">
    import Hotkey from 'src/view/components/container/controls-bar/modals/hotkeys/components/hotkey/hotkey.svelte';
    import { StatefulViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
    import {
        DynamicLabelState,
        getDynamicLabel,
        HotkeysThatBehaveDifferentlyInOutlineMode
    } from 'src/view/components/container/controls-bar/modals/hotkeys/components/helpers/get-dynamic-label';
    import { Info } from 'lucide-svelte';

    export let commandHotkeys: StatefulViewCommand;
    export let labelState: DynamicLabelState;
</script>

<div class="command">
    <span class="label"
        >{getDynamicLabel(labelState, commandHotkeys.name)}

        {#if HotkeysThatBehaveDifferentlyInOutlineMode.has(commandHotkeys.name)}
            <span
                class="info-icon"
                aria-label="Behaves differently in outline mode"
                ><Info class="svg-icon" /></span
            >
        {/if}
    </span>
    <div class="hotkeys">
        {#each commandHotkeys.hotkeys as hotkey, i}
            <Hotkey
                {hotkey}
                commandName={commandHotkeys.name}
                isPrimary={i === 0}
            />
        {/each}
    </div>
</div>

<style>
    .command {
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        gap: 8px;
        background-color: var(--color-base-30);
        flex-wrap: wrap;
    }

    .hotkeys {
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 5px;
    }

    .label {
        font-size: 14px;
        color: var(--text-normal);
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .info-icon {
        color: #4973A1FF;
        margin-bottom: -4px;

        & svg {
            width: 12px;
            height: 12px;
        }
    }
</style>
