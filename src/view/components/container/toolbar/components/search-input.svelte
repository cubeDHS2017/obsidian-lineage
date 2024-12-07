<script lang="ts">
    import { getView } from '../../context';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { Eye, Text } from 'lucide-svelte';

    const view = getView();
    const viewStore = view.viewStore;
    const search = searchStore(view);

    let focusTimeout: ReturnType<typeof setTimeout>;
    const onInput = (
        // eslint-disable-next-line no-undef
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) => {
        viewStore.dispatch({
            type: 'SEARCH/SET_QUERY',
            payload: {
                query: e.currentTarget.value,
            },
        });
        clearTimeout(focusTimeout);
        focusTimeout = setTimeout(() => {
            if (e.currentTarget) e.currentTarget.focus();
        }, 500);
    };
</script>

<div class="search-input-wrapper search-input-container">
    <input
        aria-label="Search document"
        autofocus={true}
        class="search-input search-input-element"
        enterkeyhint="search"
        on:input={onInput}
        placeholder={'search'}
        spellcheck="false"
        type="search"
        value={$search.query}
    />
    <div
        aria-label={'Clear'}
        class="search-input-clear-button"
        on:click={() => {
            viewStore.dispatch({
                type: 'SEARCH/SET_QUERY',
                payload: {
                    query: '',
                },
            });
        }}
        style={'right: 49px; top: -1px;'+($search.query ? '' : ' display: none;')}
    ></div>

    <div
        aria-label="Show all cards"
        class={'input-right-decorator clickable-icon' +
            ($search.showAllNodes ? ' is-active' : '')}
        on:click={() => {
            viewStore.dispatch({
                type: 'search/toggle-show-all-nodes',
            });

        }}
        style="right: 28px"
    >
        <Eye class="svg-icon" />
    </div>
    <div
        aria-label="Fuzzy search"
        class={'input-right-decorator clickable-icon' +
            ($search.fuzzySearch ? ' is-active' : '')}
        on:click={() => {
            viewStore.dispatch({
                type: 'SEARCH/TOGGLE_FUZZY_MODE',
            });
            viewStore.dispatch({
                type: 'SEARCH/SET_QUERY',
                payload: {
                    query: viewStore.getValue().search.query,
                },
            });
        }}
        style="right: 4px;"
    >
        <Text class="svg-icon" />
    </div>
</div>

<style>
    .search-input-element {
        height: 34px;
        padding-right: 64px;
        padding-left: 12px;
        min-width: 250px;
    }

    @media (max-width: 568px) {
        .search-input-element {
            width: 100%;
            min-width: 50px;
        }
        .search-input-wrapper {
            width: 100%;
        }
    }

    .search-input-wrapper {
        max-width: 100%;
    }

    .search-input-container::before {
        display: none;
    }
</style>
