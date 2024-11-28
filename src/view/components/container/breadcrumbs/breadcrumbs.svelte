<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import Item from './breadcrumbs-item.svelte';
    import { activeBranchStore } from 'src/stores/view/derived/active-branch-store';
    import { documentContentStore } from 'src/stores/document/derived/content-store';
    import { IdSectionStore } from 'src/stores/document/derived/id-section-store';

    const view = getView();
    const activeBranch = activeBranchStore(view);
    const contents = documentContentStore(view);
    const sections = IdSectionStore(view)
</script>

<div class="breadcrumbs-container">
    <div class="breadcrumbs">
        {#each $activeBranch.sortedParentNodes as parentId, index (parentId)}
            <Item {parentId} {index} content={$contents[parentId]?.content} section={$sections[parentId]} />
        {/each}
    </div>
</div>

<style>

    .breadcrumbs-container {
        z-index: var(--z-index-breadcrumbs);
        left: var(--size-4-2);
        bottom: var(--size-4-2);
        display: flex;
        position: absolute;
        max-width: calc(100% - var(--size-4-2) * 2);
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-s);
        background-color: var(--interactive-normal);
        box-shadow: var(--input-shadow);
        max-width: 100%;
        overflow: auto;
        font-size: var(--file-header-font-size);
        color: var(--text-muted);
        gap: 0;
    }
</style>
