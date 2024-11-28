<script>
    import NavigationHistory from './components/navigation-buttons.svelte';
    import SearchToggle from './components/search-toggle.svelte';
    import { getView } from 'src/view/components/container/context';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import SearchInput from './components/search-input.svelte';
    import BookmarksToggle from './components/bookmarks-toggle.svelte';
    import Bookmarks from '../bookmarks/bookmarks.svelte';
    import { BookmarksStore } from 'src/stores/document/derived/bookmarks-store';
    import { ShowBookmarksStore } from 'src/stores/settings/derived/view-settings-store';

    const view = getView();
    const bookmarks = BookmarksStore(view);
    const search = searchStore(view);
    const showBookmarks = ShowBookmarksStore(view);
</script>

<div class="navigation-history-container">
    <NavigationHistory />
    <SearchToggle />
    {#if $search.showInput}
        <SearchInput />
    {/if}
    {#if $bookmarks.size>0}
        <BookmarksToggle />
    {/if}
    {#if $showBookmarks}
        <Bookmarks />
    {/if}
</div>
<style>
    .navigation-history-container {
        z-index: var(--z-index-breadcrumbs);
        left: var(--size-4-2);
        top: var(--size-4-2);
        display: flex;
        position: absolute;
        gap: var(--size-4-2);
        flex-wrap: wrap;
        max-width: 90%
    }
</style>
