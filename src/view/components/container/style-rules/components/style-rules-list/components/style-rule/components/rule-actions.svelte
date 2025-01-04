<script lang="ts">
    import { StyleRule } from '../../../../../../../../../stores/settings/types/style-rules-types';
    import { getView } from '../../../../../../context';
    import { Trash } from 'lucide-svelte';

    export let rule: StyleRule;

    const view = getView();

    const toggleRule = (e: Event) => {
        const target = e.target as HTMLInputElement;
        view.plugin.settings.dispatch({
            type: target.checked
                ? 'settings/style-rules/enable-rule'
                : 'settings/style-rules/disable-rule',
            payload: { documentPath: view.file!.path, id: rule.id },
        });
    };

    const deleteRule = () => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/delete',
            payload: { documentPath: view.file!.path, id: rule.id },
        });
    };
</script>
<div class="rule-actions">
        <input
            type="checkbox"
            checked={rule.enabled}
            on:change={toggleRule}
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
    .rule-actions{
        display: flex;
        align-items: center;
        gap:  8px;
    }
    .delete-button{
        color:var(--color-red)
    }
</style>
