<script lang="ts">
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';
    import Button from '../../../shared/button.svelte';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { getView } from 'src/view/components/container/context';
    import { onDestroy } from 'svelte';
    import { sortNodeIdsBySectionNumber } from 'src/stores/document/reducers/pinned-nodes/pin-node';
    import { activeNodeStore } from 'src/stores/view/derived/active-node-store';

    const view = getView();
    const search = searchStore(view);
    const activeNode = activeNodeStore(view);

    let results: string[] = [];

    const subscriptions: (() => void)[] = [];
    onDestroy(() => {
        for (const unsub of subscriptions) {
            unsub();
        }
    });

    subscriptions.push(
        searchStore(view).subscribe((value) => {
            results = sortNodeIdsBySectionNumber(
                view.documentStore.getValue().sections,
                Array.from(value.results),
            );
        }),
    );

    const selectNextResult = () => {
        const currentIndex = results.indexOf($activeNode);
        const nextId = results[currentIndex + 1];
        if (nextId) {
            view.viewStore.dispatch({
                type: 'DOCUMENT/SET_ACTIVE_NODE',
                payload: { id: nextId },
            });
        }
    };
    const selectPreviousResult = () => {
        const currentIndex = results.indexOf($activeNode);
        const nextId = results[currentIndex - 1];
        if (nextId) {
            view.viewStore.dispatch({
                type: 'DOCUMENT/SET_ACTIVE_NODE',
                payload: { id: nextId },
            });
        }
    };
</script>

<div class="search-container buttons-group">
    <Button
        disabled={results.indexOf($activeNode) === 0}
        label={'Previous result'}
        on:click={selectPreviousResult}
        tooltipPosition="bottom"
    >
        <ChevronLeft class="svg-icon" size="12" />
    </Button>


    <Button
        disabled={results.indexOf($activeNode) === results.length - 1}
        label={'Next result'}
        on:click={selectNextResult}
        tooltipPosition="bottom"
    >
        <ChevronRight class="svg-icon" size="12" />
    </Button>
    <div class="search-stats">
        {`${results.indexOf($activeNode) + 1} / ${results.length}`}
    </div>
</div>

<style>
    .search-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-stats {
        color: var(--text-muted);
        font-size: var(--status-bar-font-size);
        font-variant-numeric: tabular-nums;
        padding: 5px 10px;
        border-left: 1px solid var(--text-faint);
    }
</style>
