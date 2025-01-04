<script lang="ts">
    import { AllRuleMatchesStore } from '../../../../../stores/view/derived/style-rules';
    import { StyleRule } from '../../../../../stores/settings/types/style-rules-types';
    import { writable } from 'svelte/store';
    import { getView } from '../../context';
    import StyleRuleContainer from './style-rule/style-rule.svelte';
    import DropTarget from './drop-target.svelte';

    export let rules: StyleRule[];
    const view = getView();
    const allMatches = AllRuleMatchesStore(view);
    const dragState = writable<{
        draggedRule: StyleRule | null;
        dropTarget: StyleRule | null;
        dropPosition: 'before' | 'after';
    } | null>(null);

    const setDraggedRule = (rule: StyleRule) => {
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

<div
    class={'rules-list' + ($dragState?.draggedRule ? ' dragging' : '')}
    on:mouseleave={resetDragState}
>
    {#each rules as rule (rule.id)}
        <div class="rule-container">
            {#if $dragState?.dropTarget?.id === rule.id}
                <DropTarget
                    {rule}
                    {resetDragState}
                    dropPosition={$dragState.dropPosition}
                    draggedRule={$dragState.draggedRule}
                >
                    <StyleRuleContainer
                        {rule}
                        {setDraggedRule}
                        {setDropTarget}
                        {resetDragState}
                        results={$allMatches.get(rule.id)}
                    />
                </DropTarget>
            {:else if $dragState?.draggedRule !== rule}
                <StyleRuleContainer
                    {rule}
                    {setDraggedRule}
                    {setDropTarget}
                    {resetDragState}
                    results={$allMatches.get(rule.id)}
                />
            {/if}
        </div>
    {/each}
</div>

<style>
    .rules-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
    .rules-list.dragging {
        background-color: var(--interactive-hover);
    }
</style>
