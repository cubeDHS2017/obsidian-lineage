<script lang="ts">
    import Button from '../../shared/button.svelte';
    import { PanelLeftDashed } from 'lucide-svelte';
    import { getView } from 'src/view/components/container/context';
    import { ShowLeftSidebarStore } from 'src/stores/settings/derived/view-settings-store';

    const view = getView();


    const show = ShowLeftSidebarStore(view);
    const toggleLeftSidebar = () => {
        view.plugin.settings.dispatch({ type: 'view/left-sidebar/toggle' });
    };
</script>

<div class="buttons-group" style="overflow: inherit">
    <div class="badge-container">
        <Button
            on:click={toggleLeftSidebar}
            active={$show}
            label={'Toggle sidebar'}
            tooltipPosition="bottom"
        >
            <PanelLeftDashed class="svg-icon" size="32" />
        </Button>

    </div>
</div>

<style>
    .badge-container {
        position: relative;
        display: inline-block;
    }

    .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background-color: var(--color-base-50);
        color: white;
        font-size: 8px;
        font-weight: bold;
        border-radius: 50%;
        padding: 7px 4px;
        line-height: 1;
        min-width: 12px;
        height: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
    }
</style>
