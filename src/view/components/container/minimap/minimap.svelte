<script lang="ts">
    import { minimapAction } from '../../../actions/minimap/minimap-action';
    import { getView } from 'src/view/components/container/context';

    const view = getView();
</script>

<div class="minimap-container" use:minimapAction={view}>
    <canvas id="minimap"></canvas>
    <div class="scroll-indicator" id="scrollIndicator"></div>
</div>

<style>
    :root {
        --scroll-indicator-color: rgba(255, 255, 255, 0.2);
    }

    .minimap-container {
        position: relative;
        height: 100%;
        width: 184px;
        padding: 4px;
        background: var(--background-primary);
        overflow: hidden;
        flex: 0 0 auto;
    }

    canvas {
        width: 176px;
        margin-right: 4px;
        transition: transform 0.1s ease-out;
    }

    .scroll-indicator {
        position: absolute;
        right: 0;
        top: 0;
        width: 4px;
        background: var(--color-base-50);
        border-radius: 2px;
        transition: transform 0.1s ease-out;
    }
</style>
