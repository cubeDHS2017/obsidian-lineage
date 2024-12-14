<script>
    import NavigationHistory from './components/navigation-buttons.svelte';
    import SearchToggle from './components/search-toggle.svelte';
    import { getView } from 'src/view/components/container/context';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import SearchInput from './components/search-input.svelte';
    import LeftSidebarToggle from './components/left-sidebar-toggle.svelte';
    import SearchNavigationButtons from './components/search/search-navigation-buttons.svelte';

    const view = getView();

    const search = searchStore(view);
</script>

<div class="navigation-history-container">
    <LeftSidebarToggle />
    <NavigationHistory />
    <SearchToggle />
    {#if $search.showInput}
        <SearchInput />
        {#if $search.query.length > 0}
            <SearchNavigationButtons />
        {/if}
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
