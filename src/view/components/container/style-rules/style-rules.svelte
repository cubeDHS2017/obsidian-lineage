<script lang="ts">
    import { DocumentStyleRulesStore } from '../../../../stores/settings/derived/style-rules';
    import { getView } from '../context';
    import StyleRulesList from './components/style-rules-list/style-rules-list.svelte';
    import StyleRulesFooter from './components/style-rules-footer.svelte';
    import DraggableModal from '../shared/draggable-modal/draggable-modal.svelte';

    const view = getView();
    const rulesStore = DocumentStyleRulesStore(view);
</script>

<DraggableModal>
    <div class="modal-content">
        <StyleRulesList rules={$rulesStore} />
    </div>
    <StyleRulesFooter />
</DraggableModal>

<style>
    .modal-content {
        width: 1022px;
        max-width: 100%;
        height: 230px;
        overflow: auto;
    }
</style>
