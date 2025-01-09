<script lang="ts">
    import Hotkey from 'src/view/components/container/controls-bar/modals/hotkeys/components/hotkey/hotkey.svelte';
    import { hotkeysLang } from 'src/lang/hotkeys-lang';
    import { ViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

    export let commandHotkeys: ViewHotkey;
</script>

<div class="command">
    <span class="label">{hotkeysLang[commandHotkeys.name]}</span>
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
        flex-wrap:wrap;
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
        display: block;
    }
</style>
