<script lang="ts">
    import { TrashIcon } from 'lucide-svelte';
    import { getView } from '../../../../../../../context';
    import FloatingButton from './floating-button.svelte';
    import { deleteNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/delete-node';
    import { lang } from 'src/lang/lang';

    export let nodeId: string;
    const view = getView();

    // eslint-disable-next-line no-undef
    const _deleteNode = (e: MouseEvent) => {
        e.stopPropagation();
        deleteNode(view, nodeId);
    };
</script>

<FloatingButton label={lang.card_btn_delete} on:click={_deleteNode} position={'up-right'}>
    <TrashIcon class="svg-con" />
</FloatingButton>
