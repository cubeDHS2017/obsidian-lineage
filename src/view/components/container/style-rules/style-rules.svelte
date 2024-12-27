<script lang="ts">
    import { DocumentStyleRulesStore } from '../../../../stores/settings/derived/style-rules';
    import { getView } from '../context';
    import ConditionEditor from './condition-editor.svelte';

    const view = getView();
    const documentPath = view.file?.path as string;
    const rulesStore = DocumentStyleRulesStore(view);

    const addRule = () => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/add',
            payload: { documentPath },
        });
    };
</script>

<div class="lineage-modal">
    <div class="modal-content">
        {#if $rulesStore.length === 0}
            <div class="pane-empty" >No rules defined</div>
        {:else}
            <div class="rules-list">
                {#each $rulesStore as rule (rule.id)}
                    <ConditionEditor {rule} />
                {/each}
            </div>
        {/if}

        <button class="add-rule" on:click={addRule}>+Add Rule</button>
    </div>
</div>

<style>
    .modal-content {
        padding: 20px;
        width: 800px;
        max-width: 800px;
        min-height: 180px;
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
    }

    .add-rule {
        padding: 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: end;
    }

    .rules-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
