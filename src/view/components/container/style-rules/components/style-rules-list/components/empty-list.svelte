<script lang="ts">
    import StyleRuleContainer
        from 'src/view/components/container/style-rules/components/style-rules-list/components/style-rule/style-rule.svelte';
    import { StyleRule } from 'src/stores/settings/types/style-rules-types';
    import { lang } from 'src/lang/lang';

    const rule: StyleRule = {
        style: { color: '', styleVariant: 'left-border' },
        enabled: false,
        condition: {
            value: 0,
            property: 'character-count',
            enabled: false,
            operator: 'greater-than',
            scope: 'any-children',
            type: 'condition',
        },
        id: '',
        name: '',
        priority: 0,
    };
    const noop = () => {};
</script>

<div style="height: 95%;">
    <div style="height: 1px; overflow: hidden; visibility: hidden">
        <StyleRuleContainer
            {rule}
            setDraggedRule={noop}
            setDropTarget={noop}
            resetDragState={noop}
            results={[]}
        />
    </div>
    <div class="pane-empty">{lang.modals_rules_no_rules}</div>
</div>

<style>
    .pane-empty {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
