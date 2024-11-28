<script lang="ts">
    import { getView } from '../context';
    import { BookmarksStore } from 'src/stores/document/derived/bookmarks-store';
    import { IdSectionStore } from 'src/stores/document/derived/id-section-store';
    import { documentContentStore } from 'src/stores/document/derived/content-store';
    import Bookmark from './components/bookmark.svelte';


    const view = getView();
    const bookmarksStore = BookmarksStore(view);
    const sectionsStore = IdSectionStore(view);
    const content = documentContentStore(view);

</script>

<div class="bookmarks">
    {#each $bookmarksStore.keys() as id}
        <Bookmark {id} section={$sectionsStore[id]} />
    {/each}
</div>

<style>
    .bookmarks {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }
</style>
