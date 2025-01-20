<script lang="ts">
    import { StyleRule } from '../../../../../../../stores/settings/types/style-rules-types';
    import { getView } from '../../../../context';

    export let rule: StyleRule;
    export let resetDragState: () => void;
    export let dropPosition: 'before' | 'after';
    export let draggedRule: StyleRule | null;

    const view = getView();
    const documentPath = view.file?.path as string;
    const handleDrop = () => {
        if (draggedRule) {
            view.plugin.settings.dispatch({
                type: 'settings/style-rules/move',
                payload: {
                    documentPath,
                    droppedId: draggedRule.id,
                    targetId: rule.id,
                    position: dropPosition,
                },
            });
        }
        resetDragState();
    };
</script>

{#if dropPosition === 'before'}
    <div
        class="drop-target"
        on:dragover={(e) => e.preventDefault()}
        on:drop={() => handleDrop()}
    ></div>
{/if}

<slot />

{#if dropPosition === 'after'}
    <div
        class="drop-target"
        on:dragover={(e) => e.preventDefault()}
        on:drop={() => handleDrop()}
    ></div>
{/if}

<style>
    .drop-target {
        height: 50px;
        background-color: var(--interactive-hover);
        border-radius: 4px;
    }
</style>
