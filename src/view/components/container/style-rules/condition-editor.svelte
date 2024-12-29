<script lang="ts">
    import { StyleRule } from '../../../../stores/settings/types/style-rules-types';
    import { getView } from 'src/view/components/container/context';
    import { GripVertical, Trash } from 'lucide-svelte';
    import { ruleDndAction } from 'src/view/components/container/style-rules/dnd/actions/rule-dnd';
    import {
        numericOperators,
        properties,
        readableText,
        stringOperators,
        targets
    } from 'src/view/components/container/style-rules/helpers/constants';
    import { ruleEventHandlers } from 'src/view/components/container/style-rules/helpers/rule-event-handlers';


    export let rule: StyleRule;
    export let setDraggedRule: (rule: StyleRule) => void;
    export let setDropTarget: (
        rule: StyleRule,
        position: 'before' | 'after',
    ) => void;
    export let resetDragState: () => void;

    const view = getView();

  const h = ruleEventHandlers(view,rule.id)


    $: operatorIsBetween =
        rule.condition.operator === 'between' ||
        rule.condition.operator === 'not-between';
    $: isStringCondition =
        rule.condition.property === 'content' ||
        rule.condition.property === 'headings';
</script>

<div
    class="rule"
    use:ruleDndAction={{
        setDraggedRule,
        setDropTarget,
        resetDragState,
        rule,
        view,
    }}
    draggable="true"
>
    <div class="drag-handle">
        <GripVertical class="svg-icon" />
    </div>
    <input type="color" value={rule.color} on:input={h.handleColorChange} />

    <select
        value={rule.condition.property}
        on:change={h.handlePropertyChange}
        aria-label="Property"
    >
        {#each properties as property}
            <option value={property}>{readableText.properties[property]}</option
            >
        {/each}
    </select>
    <select
        value={rule.condition.scope}
        on:change={h.handleScopeChange}
        aria-label="Scope"
    >
        {#each targets as target}
            <option value={target}>{readableText.targets[target]}</option>
        {/each}
    </select>

    <select
        value={rule.condition.operator}
        on:change={h.handleOperatorChange}
        aria-label="Operator"
    >
        {#if isStringCondition}
            {#each stringOperators as operator}
                <option value={operator}
                    >{readableText.operators[operator]}</option
                >
            {/each}
        {:else}
            {#each numericOperators as operator}
                <option value={operator}
                    >{readableText.operators[operator]}</option
                >
            {/each}
        {/if}
    </select>

    {#if !['empty', 'not-empty'].includes(rule.condition.operator)}
        <input
            type={isStringCondition ? 'text' : 'number'}
            value={rule.condition.value}
            on:input={h.handleValueChange}
            placeholder={isStringCondition ? 'Text' : 'Number'}
            style={isStringCondition
                ? ''
                : operatorIsBetween
                  ? 'width: 75px'
                  : ''}
            aria-label={operatorIsBetween ? 'Value 1' : 'Value'}
        />
    {/if}
    {#if operatorIsBetween}
        <input
            type="number"
            value={'valueB' in rule.condition ? rule.condition.valueB : 0}
            on:input={h.handleValueBChange}
            placeholder={'Number'}
            style={'width: 75px'}
            aria-label="Value 2"
        />
    {/if}

    <input
        type="checkbox"
        checked={rule.enabled}
        on:change={h.handleToggleChange}
        aria-label="Enable"
    />
    <div
        class="clickable-icon delete-button"
        on:click={h.deleteRule}
        aria-label="Delete"
    >
        <Trash class="svg-icon" />
    </div>
<!--    <div class="debug-node-id">{rule.id}</div>-->
</div>

<style>
    .rule {
        border-radius: 4px;
        padding: 12px;
        background-color: var(--background-secondary);
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    select {
        min-width: 120px;
    }

    .delete-button {
        background: #ff4444;
        border: none;

        color: white;
        cursor: pointer;
    }

    .drag-over {
        border: 2px dashed var(--interactive-accent);
    }

    .drag-handle {
        cursor: grab;
        color: var(--text-muted);
        padding: 4px;
        display: flex;
        align-items: center;
    }

    .drag-handle:hover {
        color: var(--text-normal);
    }

   /* .debug-node-id {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 12px;
        color: var(--text-on-accent);
        background-color: var(--color-accent);
    }*/
</style>
