<script lang="ts">
    import { hotkeyStore } from '../../../../../../stores/hotkeys/hotkey-store';
    import { lang } from 'src/lang/lang';

    let searchTerm = '';

    $: {
        hotkeyStore.dispatch({
            type: 'UI/SET_SEARCH_TERM',
            payload: {
                searchTerm,
            },
        });
    }
</script>
<div class="front">
    <div class="search-input-container">
        <input
            bind:value={searchTerm}
            class="search-input"
            enterkeyhint="search"
            placeholder={lang.modals_hk_input_placeholder}
            spellcheck="false"
            type="search"
        />
        <div
            aria-label={lang.tlb_search_clear}
            class="search-input-clear-button"
            on:click={() => {
                    searchTerm = '';
                }}
        ></div>
    </div>
</div>
<style>
    .front {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .search-input-container {
        width: 100%;
    }
</style>
