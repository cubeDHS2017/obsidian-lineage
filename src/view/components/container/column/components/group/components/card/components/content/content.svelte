<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import { markdownPreviewAction } from 'src/view/actions/markdown-preview/markdown-preview-action';
    import {
        handleClick
    } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links';

    export let nodeId: string;

    const view = getView();
    const onClick = handleClick(view);

</script>

<div
    class={'lng-prev markdown-preview-view markdown-preview-section markdown-rendered'
       }
    on:click={onClick}
    use:markdownPreviewAction={nodeId}
></div>

<style>
    .lng-prev {
        width: 100%;
        min-height: var(--min-node-height);

        font-size: var(--font-text-size);
        padding: 6px 6px 10px 12px;
        color-scheme: light;
    }

</style>
