<script lang="ts">
    import { NodeId } from 'src/stores/document/document-state-type';
    import { loadInlineEditor } from 'src/view/actions/inline-editor/load-inline-editor';
    import { expandableTextareaAction } from 'src/view/actions/inline-editor/expandable-textarea-action';

    export let nodeId: NodeId;
</script>

<div class="editor-container" use:expandableTextareaAction use:loadInlineEditor={nodeId}>

</div>

<style>
    .editor-container {
        width: 100%;
        min-height: var(--min-node-height);
        height: fit-content;
        overflow: hidden;
        display: flex;
    }

</style>
