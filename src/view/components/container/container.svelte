<script lang="ts">
    import Column from './column/column.svelte';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndX } from 'src/view/actions/dnd/scroll-on-dnd-x';
    import { columnsStore } from 'src/stores/document/derived/columns-store';
    import ColumnsBuffer from './buffers/columns-buffer.svelte';
    import { scrollingModeStore } from 'src/stores/settings/derived/scrolling-store';
    import { dndStore } from 'src/stores/view/derived/dnd-store';
    import { activeBranchStore } from 'src/stores/view/derived/active-branch-store';
    import { activeNodeStore } from 'src/stores/view/derived/active-node-store';
    import { documentStateStore } from 'src/stores/view/derived/editing-store';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { NodeId } from 'src/stores/document/document-state-type';
    import { limitPreviewHeightStore } from 'src/stores/settings/derived/limit-preview-height-store';
    import { IdSectionStore } from 'src/stores/document/derived/id-section-store';
    import { contextMenu } from 'src/view/actions/context-menu/context-menu';
    import { closeModalsWhenClickingOutside } from 'src/view/actions/close-modals-when-clicking-outside';
    import { selectedNodesStore } from 'src/stores/view/derived/selected-nodes-store';
    import { BookmarksStore } from 'src/stores/document/derived/bookmarks-store';

    const view = getView();
    const columns = columnsStore(view);
    const scrolling = scrollingModeStore(view);
    const dnd = dndStore(view);
    const activeBranch = activeBranchStore(view);
    const activeNode = activeNodeStore(view);
    const selectedNodes = selectedNodesStore(view);
    const editing = documentStateStore(view);
    const search = searchStore(view);
    const bookmarks = BookmarksStore(view)
    const limitPreviewHeight = limitPreviewHeightStore(view);
    const idSection = IdSectionStore(view,);
    let parentNodes: Set<NodeId> = new Set<NodeId>();
    $: parentNodes = new Set($activeBranch.sortedParentNodes);

</script>

<div
    class={'columns-container ' +
        ($scrolling === 'fixed-position' ||
        $scrolling === 'keep-active-card-at-center'
            ? 'hide-scrollbars'
            : '') +
        ($limitPreviewHeight ? ' limit-card-height' : '')}
    id="columns-container"
    tabindex="0"
    use:closeModalsWhenClickingOutside={view}
    use:contextMenu={view}

    use:scrollOnDndX
>
    <div class="columns">
        {#if $scrolling === 'fixed-position' || $scrolling === 'keep-active-card-at-center'}
            <ColumnsBuffer />
        {/if}
        {#each $columns as column (column.id)}
            <Column
                columnId={column.id}
                dndChildGroups={$dnd.childGroups}
                {parentNodes}
                activeGroup={$activeBranch.group}
                activeChildGroups={$activeBranch.childGroups}
                activeNode={$activeNode}
                editedNode={$editing.activeNodeId}
                disableEditConfirmation={$editing.disableEditConfirmation}
                searchQuery={$search.query}
                searchResults={$search.results}
                searching={$search.searching}
                idSection={$idSection}
                selectedNodes={$selectedNodes}
                bookmarks={$bookmarks}
            />
        {/each}
        {#if $scrolling === 'fixed-position' || $scrolling === 'keep-active-card-at-center'}
            <ColumnsBuffer />
        {:else}
            <div style="min-width: 50px;min-height: 10px"></div>
        {/if}
    </div>
</div>

<style>
    :root {
        --container-left-padding: 100px;
    }
    .columns-container {
        position: relative;
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: var(--container-left-padding);
        overflow-y: hidden;
        overflow-x: auto;
    }
    :global(.is-mobile) {
        --container-left-padding: 10px;
    }
    .columns {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .hide-scrollbars {
        --scrollbar-thumb-bg: transparent;
        --scrollbar-active-thumb-bg: transparent;
        --scrollbar-bg: transparent;
    }
    .hide-scrollbars::-webkit-scrollbar {
        display: none;
    }
    .limit-card-height {
        & .preview-container {
            max-height: 65vh;
        }
        & .editor-container {
            max-height: 65vh;
        }
    }
</style>
