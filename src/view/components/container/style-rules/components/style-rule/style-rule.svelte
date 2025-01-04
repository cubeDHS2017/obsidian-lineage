<script lang="ts">
    import RuleInfo from './components/rule-info.svelte';
    import RuleEditor from './components/rule-editor.svelte';
    import { GripVertical } from 'lucide-svelte';
    import { StyleRule } from '../../../../../../stores/settings/types/style-rules-types';
    import { ruleDndAction } from './components/actions/rule-dnd';
    import { getView } from '../../../context';

    export let setDraggedRule: (rule: StyleRule) => void;
    export let setDropTarget: (
        rule: StyleRule,
        position: 'before' | 'after',
    ) => void;
    export let resetDragState: () => void;
    export let rule: StyleRule;
    export let results: string[] | undefined;

    const view = getView();
</script>

<div
    class="rule-container"
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
    <RuleInfo {rule} {results}/>
    <RuleEditor {rule}/>
</div>

<style>
    .rule-container {
        display: flex;
        border-radius: 4px;
        overflow: hidden;
        background-color: var(--color-base-20);
        padding: 12px;
        gap: 4px 8px;
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
</style>
