<script lang="ts">
    import RenderHotkey from './render-hotkey.svelte';
    import EditHotkey from './edit-hotkey.svelte';
    import clx from 'classnames';

    import { CommandName } from 'src/lang/hotkey-groups';
    import { ExtendedHotkey } from 'src/stores/hotkeys/hotkey-store';
    import { writable } from 'svelte/store';
    import { getView } from 'src/view/components/container/context';
    import { onMount } from 'svelte';
    import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';

    export let hotkey: ExtendedHotkey;
    export let commandName: CommandName;
    export let isPrimary: boolean;
    const view = getView();
    const editing = writable(false);
    onMount(() => {
        let initialRun = true;
        return editing.subscribe(() => {
            if (initialRun) {
                initialRun = false;
            } else {
                focusContainer(view);
            }
        });
    });
</script>

<div
    aria-label={hotkey.obsidianConflict
        ? `Used by "${hotkey.obsidianConflict}"`
        : hotkey.pluginConflict
          ? `Used by "${hotkey.pluginConflict}"`
          : ''}
    class={clx(
        'hotkey',
        hotkey.obsidianConflict && 'obsidian-conflict',
        hotkey.pluginConflict && 'plugin-conflict',
        hotkey.isCustom && 'hotkey--is-custom',
        $editing && 'editing',
    )}
>
    {#if $editing}
        <EditHotkey
            {hotkey}
            onCancel={() => editing.set(false)}
            {isPrimary}
            {commandName}
            isCustom={hotkey.isCustom}
        />
    {:else}
        <RenderHotkey {hotkey} enableEditing={() => editing.set(true)} />
    {/if}
</div>

<style>
    .hotkey {
        padding: 5px;
        background-color: var(--color-base-50);
        display: flex;
        gap: 5px;
        border-radius: 3px;
        width: fit-content;
        position: relative;
    }

    .editing {
        background-color: var(--color-base-60);
    }

    .hotkey--is-custom {
        background-color: var(--custom-hotkey-bg);
    }
    .obsidian-conflict {
        background-color: var(--color-red);
    }
    .plugin-conflict {
        background-color: var(--color-orange);
    }
</style>
