<script lang="ts">
    import { contentStore } from '../../../../../stores/document/derived/content-store';
    import { getView } from '../../context';
    import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';

    export let section: string;
    export let id: string;

    const view = getView();
    const content = contentStore(view, id);
    const deleteBookmark = () => {
        view.documentStore.dispatch({
            type: 'BOOKMARKS/REMOVE',
            payload: {
                id,
            },
        });
        focusContainer(view);
    };
    const onClick = () => {
        view.viewStore.dispatch({
            type: 'DOCUMENT/SET_ACTIVE_NODE',
            payload: {
                id,
            },
        });
    };
</script>

<button
    class={'bookmark'}
    data-tooltip-position={'bottom'}
    aria-label={section + '\n' + $content}
    on:click={onClick}
>
    {#if $content}
        <span class="bookmark-content">
            {$content}
        </span>
    {:else}
        <span class="section-number ">
            {section}
        </span>
    {/if}

    <span
        aria-label={'Remove from bookmarks'}
        class="search-input-clear-button"
        on:click={deleteBookmark}
        style="opacity:0.5; cursor: pointer"
    ></span>
</button>

<style>
    .bookmark {
        position: relative !important;
        width: auto !important;
        height: 34px !important;
        padding: 8px !important;
        font-size: inherit;
        color: var(--text-muted) !important;
        background-color: var(--interactive-normal);
        --icon-size: var(--icon-s);
        --icon-stroke: var(--icon-s-stroke-width);
        cursor: pointer;
        border-radius: 0;
        border: none;
        box-shadow: var(--input-shadow);
        background-color: var(--interactive-normal);
        --icon-size: var(--icon-s);
        --icon-stroke: var(--icon-s-stroke-width);
    }

    .bookmark:hover {
        background-color: var(--interactive-hover);
    }

    .bookmark-content {
        display: inline-block;
        width: 25ch;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .section-number {
        font-style: italic;
        color: var(--text-faint);
        width: 25ch;
    }
</style>
