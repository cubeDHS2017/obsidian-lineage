<script lang="ts">
    import { Pen } from 'lucide-svelte';
    import { modKeyDictionary } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key-dictionary';
    import { ViewHotkey } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';
    import EditorState from './editor-state/render-editor-state.svelte';

    export let enableEditing: () => void;
    export let hotkey: ViewHotkey;
</script>

<div class="hotkey-buttons" on:click={enableEditing}>
    <button class="hotkey-button"
        ><Pen class="svg-icon" size={8} /></button
    >
</div>
<kbd class="hotkey-key">{hotkey.key}</kbd>
{#each hotkey.modifiers as modifier}
    <kbd>{modKeyDictionary[modifier]}</kbd>
{/each}
<EditorState {hotkey} />

<style>
    .hotkey-buttons {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        opacity: 0;
        background-color: var(--color-base-70);
    }
    .hotkey-button {
        /*background-color: transparent;*/
        border: none;
        width: 16px;
        height: 16px;
        box-shadow: none;
        padding: 2px;
        cursor: pointer;
    }
    .hotkey-buttons:hover {
        opacity: 0.8;
    }
    .hotkey-key {
        color: var(--text-on-accent);
        background-color: #175c5a;
    }
</style>
