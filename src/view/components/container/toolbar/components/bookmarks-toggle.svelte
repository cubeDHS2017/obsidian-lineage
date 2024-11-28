<script lang="ts">
    import Button from '../../shared/button.svelte';
    import { BookMarked } from 'lucide-svelte';
    import { getView } from 'src/view/components/container/context';
    import { ShowBookmarksStore } from 'src/stores/settings/derived/view-settings-store';
    import { BookmarksStore } from 'src/stores/document/derived/bookmarks-store';

    const view = getView();

    const show = ShowBookmarksStore(view);
    const bookmarks = BookmarksStore(view);
    const toggleBookmarks = () => {
        view.plugin.settings.dispatch({ type: 'VIEW/TOGGLE_BOOKMARKS' });
    };
</script>

<div class="buttons-group" style="overflow: inherit">
    <div class="badge-container">
        <Button
            on:click={toggleBookmarks}
            active={$show}
            label={'Toggle bookmarks'}
            tooltipPosition="bottom"
        >
            <BookMarked class="svg-icon" size="32" />
        </Button>
        {#if !$show}
            <span class="badge">{$bookmarks.size}</span>
        {/if}
    </div>
</div>

<style>
    .badge-container {
        position: relative;
        display: inline-block;
    }

    .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background-color: var(--color-base-50);
        color: white;
        font-size: 8px;
        font-weight: bold;
        border-radius: 50%;
        padding: 7px 4px;
        line-height: 1;
        min-width: 12px;
        height: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
    }
</style>
