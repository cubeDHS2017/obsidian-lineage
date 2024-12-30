<script lang="ts">
    import { DocumentStyleRulesStore } from '../../../../stores/settings/derived/style-rules';
    import { getView } from '../context';
    import ConditionEditor from './condition-editor.svelte';
    import { writable } from 'svelte/store';
    import { StyleRule } from 'src/stores/settings/types/style-rules-types';
    import DropTarget from './dnd/drop-target.svelte';

    const view = getView();
    const documentPath = view.file?.path as string;
    const rulesStore = DocumentStyleRulesStore(view);
    const dragState = writable<{
        draggedRule: StyleRule | null;
        dropTarget: StyleRule | null;
        dropPosition: 'before' | 'after';
    } | null>(null);

    const addRule = () => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/add',
            payload: { documentPath },
        });
    };

    const setDraggedRule = (rule: StyleRule,) => {
        dragState.update((dragState) => {
            return {
                dropTarget: dragState?.dropTarget || null,
                dropPosition: dragState?.dropPosition || 'before',
                draggedRule: rule,
            };
        });
    };
    const setDropTarget = (rule: StyleRule, position: 'before' | 'after') => {
        dragState.update((dragState) => {
            return {
                draggedRule: dragState?.draggedRule || null,
                dropTarget: rule,
                dropPosition: position,
            };
        });
    };

    const resetDragState = () => {
        dragState.set(null);
    };
</script>

<div class="lineage-modal" on:mouseleave={resetDragState}>
    <div class="modal-content">
        {#if $rulesStore.length === 0}
            <div class="pane-empty" >No rules defined</div>
        {:else}
            <div
                class={'rules-list' +
                    ($dragState?.draggedRule ? ' dragging' : '')}
            >
                {#each $rulesStore as rule  (rule.id)}
                    <div class="rule-container">
                        {#if $dragState?.dropTarget?.id === rule.id}
                            <DropTarget
                                {rule}
                                {resetDragState}
                                dropPosition={$dragState.dropPosition}
                                draggedRule={$dragState.draggedRule}
                            >
                                <ConditionEditor
                                    {rule}
                                    {setDraggedRule}
                                    {setDropTarget}
                                    {resetDragState}
                                />
                            </DropTarget>
                        {:else if $dragState?.draggedRule !== rule}
                            <ConditionEditor
                                {rule}
                                {setDraggedRule}
                                {setDropTarget}
                                {resetDragState}
                            />
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}

        <button class="add-rule" on:click={addRule}>+Add Rule</button>
    </div>
</div>

<style>
    .modal-content {
        padding-bottom: 10px;
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
        margin-right: 10px;
    }

    .rules-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
    .rules-list.dragging {
        background-color: var(--interactive-hover);
    }

    .pane-empty {
        flex: 1;
        display: flex;
        align-items: center;
    }
</style>
