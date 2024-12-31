<script lang="ts">
    import Column from './column/column.svelte';
    import { getView } from 'src/view/components/container/context';
    import { scrollOnDndX } from 'src/view/actions/dnd/scroll-on-dnd-x';
    import { columnsStore, singleColumnStore } from 'src/stores/document/derived/columns-store';
    import ColumnsBuffer from './buffers/columns-buffer.svelte';
    import { dndStore } from 'src/stores/view/derived/dnd-store';
    import { activeBranchStore } from 'src/stores/view/derived/active-branch-store';
    import { activeNodeStore } from 'src/stores/view/derived/active-node-store';
    import { documentStateStore } from 'src/stores/view/derived/editing-store';
    import { searchStore } from 'src/stores/view/derived/search-store';
    import { NodeId } from 'src/stores/document/document-state-type';
    import { limitPreviewHeightStore } from 'src/stores/settings/derived/limit-preview-height-store';
    import { IdSectionStore } from 'src/stores/document/derived/id-section-store';
    import { selectedNodesStore } from 'src/stores/view/derived/selected-nodes-store';
    import { PinnedNodesStore } from 'src/stores/document/derived/pinned-nodes-store';
    import { GroupParentIdsStore } from 'src/stores/document/derived/meta';
    import { ApplyGapBetweenCardsStore } from 'src/stores/settings/derived/view-settings-store';
    import {
        saveNodeContent
    } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
    import { PendingConfirmationStore } from 'src/stores/view/derived/pending-confirmation';
    import { MatchingStyleRulesStore } from 'src/stores/view/derived/style-rules';
    import { onMount } from 'svelte';
    import { alignBranch } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';

    export let singleColumnMode: boolean;

    const view = getView();

    const columns = singleColumnMode
        ? singleColumnStore(view)
        : columnsStore(view);
    const dnd = dndStore(view);
    const activeBranch = activeBranchStore(view);
    const activeNode = activeNodeStore(view);
    const selectedNodes = selectedNodesStore(view);
    const editing = documentStateStore(view);
    const search = searchStore(view);
    const limitPreviewHeight = limitPreviewHeightStore(view);
    const idSection = IdSectionStore(view);
    const styleRules = MatchingStyleRulesStore(view);
    let parentNodes: Set<NodeId> = new Set<NodeId>();
    $: parentNodes = new Set($activeBranch.sortedParentNodes);
    const groupParentIds = GroupParentIdsStore(view);
    const pinnedNodesArray = PinnedNodesStore(view);
    $: pinnedNodes = new Set($pinnedNodesArray);

    const applyGap = ApplyGapBetweenCardsStore(view);
    const pendingConfirmation = PendingConfirmationStore(view);
    const saveActiveNodeOnClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.lng-prev')) {
            const editingState = view.viewStore.getValue().document.editing;
            if (editingState.activeNodeId && !editingState.isInSidebar) {
                saveNodeContent(view);
            }
        }
    };
    let containerRef: HTMLElement | null = null;
    onMount(() => {
        view.container = containerRef;
        alignBranch(view, { type: 'view/life-cycle/mount' });
    });
</script>

<div
    bind:this={containerRef}
    class={'columns-container ' +
        ($limitPreviewHeight ? ' limit-card-height' : '') +
        ($applyGap ? ' gap-between-cards' : '') +
        (singleColumnMode ? ' single-column' : '')}
    id="columns-container"
    tabindex="0"
    on:click={saveActiveNodeOnClick}
    use:scrollOnDndX
>
    <div class="columns">
        <ColumnsBuffer />

        {#each $columns as column, i (column.id)}
            <Column
                columnId={column.id}
                dndChildGroups={$dnd.childGroups}
                {parentNodes}
                activeGroup={$activeBranch.group}
                activeChildGroups={$activeBranch.childGroups}
                activeNode={$activeNode}
                editedNodeState={$editing}
                searchQuery={$search.query}
                searchResults={$search.results}
                showAllNodes={$search.showAllNodes}
                searching={$search.searching}
                idSection={$idSection}
                selectedNodes={$selectedNodes}
                {pinnedNodes}
                pendingConfirmation={$pendingConfirmation}
                groupParentIds={$groupParentIds}
                firstColumn={i === 0}
                styleRules={$styleRules}
                {singleColumnMode}
            />
        {/each}
        <ColumnsBuffer />
    </div>
</div>

<style>
    :root {
        --container-left-padding: 100px;
        --column-gap: 0;
        --node-gap: 4px;
        --group-gap: 2px;
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
        --scrollbar-thumb-bg: transparent;
        --scrollbar-active-thumb-bg: transparent;
        --scrollbar-bg: transparent;
    }
    :global(.is-mobile) {
        --container-left-padding: 10px;
    }
    .columns {
        display: flex;
        align-items: center;
        gap: var(--column-gap);
        transform: scale(var(--zoom-level));
        height: calc(1 / var(--zoom-level) * 100vh);
        width: calc(1 / var(--zoom-level) * 100vw);
    }

    .columns-container::-webkit-scrollbar {
        display: none;
    }
    .limit-card-height {
        & .lng-prev {
            max-height: 65vh;
        }
        & .editor-container {
            max-height: 65vh;
        }
    }

    .single-column {
        & .group {
            background-color: transparent;
        }
        --node-gap: 60px;
        & .active-parent-bridge-right {
            display: none;
        }

        & .active-parent-bridge-left {
            display: none;
        }
        & .active-node-bridge {
            display: none;
        }

        & .active-node {
            outline: 8px solid var(--background-active-parent) !important;
        }
    }
    .gap-between-cards {
        & .group {
            background-color: transparent;
        }
        --node-gap: var(--node-gap-setting);
        --column-gap: var(--column-gap-setting);
        --group-gap: var(--node-gap-setting);

        & .active-parent-bridge-right {
          display: none;
        }

        & .active-parent-bridge-left {
            display: none;
        }
        & .active-node-bridge {
            display: none;
        }

       & .active-node {
            outline: 8px solid var(--background-active-parent) !important;
        }
    }
</style>
