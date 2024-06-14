<script lang="ts">
    import Content from './components/content-preview.svelte';
    import Buttons from './components/modal-buttons.svelte';
    import { SplitNodeModalProps, SplitNodeModalState } from 'src/view/modals/split-node-modal/split-node-modal';
    import { setContext } from 'svelte';

    export let state: SplitNodeModalState;
    export let props: SplitNodeModalProps;


    setContext("modal-state",state)
    setContext("modal-props",props)


</script>

<div class="split-content-modal">
    <Content  />
    <Buttons   />
</div>

<style>
    .split-content-modal {
        display: flex;
        flex-direction: column;
    }
</style>
