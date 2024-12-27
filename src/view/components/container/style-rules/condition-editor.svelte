<script lang="ts">
    import {
        ComparisonOperator,
        ConditionNode,
        NumericOperator,
        NumericProperty,
        StringOperator,
        StringProperty,
        StyleRule,
        StyleRuleCondition,
        StyleRuleTarget
    } from '../../../../stores/settings/types/style-rules-types';
    import { getView } from 'src/view/components/container/context';
    import { Trash } from 'lucide-svelte';

    export let rule: StyleRule;

    const view = getView();
    const documentPath = view.file?.path as string;

    const targets: StyleRuleTarget[] = [
        'self',
        'direct-parent',
        'any-parent',
        'direct-children',
        'any-children',
    ];

    const readableText = {
        targets: {
            self: 'Of card',
            'direct-parent': 'Of immediate parent',
            'any-parent': 'Of any parent',
            'direct-children': 'Of immediate child',
            'any-children': 'Of any child',
        } satisfies Record<StyleRuleTarget, string>,
        operators: {
            contains: 'Contains',
            'not-contains': 'Does not contain',
            equals: 'Equals',
            'not-equals': 'Does not equal',
            empty: 'Is empty',
            'not-empty': 'is not empty',

            'greater-than': 'Is greater than',
            'less-than': 'Is less than',
            between: 'Is between',
            'not-between': 'Is not between',
            'starts-with': 'Starts with',
            'not-starts-with': 'Does not start with',
            'ends-with': 'Ends with',
            'not-ends-with': 'Does not end with',
            'matches-regex': 'Matches regex',
            'not-matches-regex': 'Does not match regex',
        } satisfies Record<NumericOperator | StringOperator, string>,
        properties: {
            depth: 'Depth',
            'character-count': 'Character count',
            'word-count': 'Word count',
            'line-count': 'Line count',
            'direct-children-count': 'Direct children count',
            'total-children-count': 'Total children count',
            content: 'Content',
            headings: 'Headings',
            'headings-word-count': 'Headings word count',
        } satisfies Record<NumericProperty | StringProperty, string>,
    };

    const stringOperators: StringOperator[] = [
        'contains',
        'not-contains',
        'equals',
        'not-equals',
        'empty',
        'not-empty',
        'starts-with',
        'not-starts-with',
        'ends-with',
        'not-ends-with',
        'matches-regex',
        'not-matches-regex',
    ];

    const numericOperators: NumericOperator[] = [
        'equals',
        'not-equals',
        'empty',
        'not-empty',
        'greater-than',
        'less-than',
        'between',
        'not-between',
    ];

    const properties: (NumericProperty | StringProperty)[] = [
        'content',
        'headings',
        'headings-word-count',
        'depth',
        'character-count',
        'word-count',
        'line-count',
        'direct-children-count',
        'total-children-count',
    ];

    const toggleRule = (id: string, enabled: boolean) => {
        view.plugin.settings.dispatch({
            type: enabled
                ? 'settings/style-rules/enable-rule'
                : 'settings/style-rules/disable-rule',
            payload: { documentPath, id },
        });
    };

    const deleteRule = () => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/delete',
            payload: { documentPath, id: rule.id },
        });
    };
    const updateRule = (id: string, rule: Partial<StyleRule>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update',
            payload: { documentPath, id, rule },
        });
    };

    const updateCondition = (updates: Partial<StyleRuleCondition>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update-condition',
            payload: {
                documentPath,
                ruleId: rule.id,
                updates,
            },
        });
    };

    const handleScopeChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ scope: target.value as StyleRuleTarget });
    };

    const handlePropertyChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({
            property: target.value as ConditionNode['property'],
        });
    };

    const handleOperatorChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ operator: target.value as ComparisonOperator });
    };

    const handleValueChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ value: target.value });
    };
    const handleValueBChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ valueB: parseFloat(target.value) });
    };

    const handleColorChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateRule(rule.id, { color: target.value });
    };

    const handleToggleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        toggleRule(rule.id, target.checked);
    };

    $: operatorIsBetween =
        rule.condition.operator === 'between' ||
        rule.condition.operator === 'not-between';
    $: isStringCondition =
        rule.condition.property === 'content' ||
        rule.condition.property === 'headings';
</script>

<div class="rule">
    <input type="color" value={rule.color} on:input={handleColorChange} />

    <select
        value={rule.condition.property}
        on:change={handlePropertyChange}
        aria-label="Property"
    >
        {#each properties as property}
            <option value={property}>{readableText.properties[property]}</option
            >
        {/each}
    </select>
    <select
        value={rule.condition.scope}
        on:change={handleScopeChange}
        aria-label="Scope"
    >
        {#each targets as target}
            <option value={target}>{readableText.targets[target]}</option>
        {/each}
    </select>

    <select
        value={rule.condition.operator}
        on:change={handleOperatorChange}
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
            on:input={handleValueChange}
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
            on:input={handleValueBChange}
            placeholder={'Number'}
            style={'width: 75px'}
            aria-label="Value 2"
        />
    {/if}

    <input
        type="checkbox"
        checked={rule.enabled}
        on:change={handleToggleChange}
        aria-label="Enable"
    />
    <div
        class="clickable-icon delete-button"
        on:click={deleteRule}
        aria-label="Delete"
    >
        <Trash class="svg-icon" />
    </div>
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
</style>
