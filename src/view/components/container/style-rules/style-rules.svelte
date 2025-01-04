<script lang="ts">
    import { DocumentStyleRulesStore } from '../../../../stores/settings/derived/style-rules';
    import { getView } from '../context';
    import { lang } from 'src/lang/lang';
    import StyleRulesList from './components/style-rules-list.svelte';
    import StyleRulesFooter from './components/style-rules-footer.svelte';

    const view = getView();
    const rulesStore = DocumentStyleRulesStore(view);
</script>

<div class="lineage-modal">
    <div class="modal-content">
        {#if $rulesStore.length === 0}
            <div class="pane-empty">{lang.modals_rules_no_rules}</div>
        {:else}
            <StyleRulesList rules={$rulesStore} />
        {/if}
        <StyleRulesFooter />
    </div>
</div>

<style>
    .modal-content {
        padding-bottom: 10px;
        width: fit-content;
        max-width: 90vw;
        overflow-x: auto;
        min-height: 180px;
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
    }

    .pane-empty {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        /* min width of a rule*/
        width:936px;
    }
</style>
