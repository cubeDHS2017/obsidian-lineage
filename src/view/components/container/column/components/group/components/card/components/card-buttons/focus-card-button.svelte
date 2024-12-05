<script lang="ts">
   import { getView } from '../../../../../../../context';
   import FloatingButton from './floating-button.svelte';
   import { Focus } from 'lucide-svelte';

   export let nodeId: string;
    const view = getView();
    // eslint-disable-next-line no-undef
    const focusCard = (e: MouseEvent) => {
       view.viewStore.dispatch({type: 'DOCUMENT/SET_ACTIVE_NODE',payload: {id: nodeId}})
    };

</script>

<FloatingButton label={"Bring card into view"} on:click={focusCard} position="up-right">
   <Focus class="svg-icon"/>
</FloatingButton>
