<script lang="ts">
    import { dndStore } from 'src/stores/view/derived/dnd-store';
    import { getView } from 'src/view/components/container/context';

    const view = getView();
    const dnd = dndStore(view);
</script>

<div id="dnd-edge-top" class={$dnd.node ? '' : 'hide'}></div>
<div id="dnd-edge-bottom" class={$dnd.node ? '' : 'hide'}></div>
<div id="dnd-edge-left" class={$dnd.node ? '' : 'hide'}></div>
<div id="dnd-edge-right" class={$dnd.node ? '' : 'hide'}></div>

<style>
    .hide {
        display: none;
    }
    #dnd-edge-top,
    #dnd-edge-bottom {
        height: 40px;
      
        position: absolute;

        left: 0;
        right: 0;
        z-index: 100;
        background-color: var(--color-base-20);
        opacity: 0.1;
    }
    #dnd-edge-top {
        top: 0;
    }
    #dnd-edge-bottom {
        bottom: 0;
    }

    #dnd-edge-left,
    #dnd-edge-right {
        width: 40px;

        position: absolute;

        top: 40px;
        bottom: 40px;
        z-index: 100;
        background-color: var(--color-base-20);
        opacity: 0.1;
    }
    #dnd-edge-left {
        left: 0;
    }
    #dnd-edge-right {
        right: 0;
    }
</style>
