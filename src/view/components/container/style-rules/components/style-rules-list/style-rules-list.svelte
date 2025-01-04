<script lang="ts">
    import { AllRuleMatchesStore } from '../../../../../../stores/view/derived/style-rules';
    import { StyleRule } from '../../../../../../stores/settings/types/style-rules-types';
    import { writable } from 'svelte/store';
    import { getView } from '../../../context';
    import StyleRuleContainer from './components/style-rule/style-rule.svelte';
    import DropTarget from './components/drop-target.svelte';
    import EmptyList from './components/empty-list.svelte';

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
    {#if rules.length === 0}
        <EmptyList />
    {:else}
        {#each rules as rule (rule.id)}
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
        {/each}
    {/if}
</div>

<style>
    .rules-list {
        padding: 10px;
        height: 100%;
    }
    .rules-list.dragging {
        background-color: var(--interactive-hover);
    }
    
</style>
