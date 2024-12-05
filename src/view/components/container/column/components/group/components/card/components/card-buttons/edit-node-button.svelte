<script lang="ts">
    import { PencilIcon, SaveIcon } from 'lucide-svelte';
    import { getView } from '../../../../../../../context';
    import FloatingButton from './floating-button.svelte';
    import {
        saveNodeContent
    } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';

    export let editing: boolean;
    export let nodeId: string;
    export let isInSidebar: boolean;
    const view = getView();
    const viewStore = view.viewStore;
    // eslint-disable-next-line no-undef
    const toggleEdit = (e: MouseEvent) => {
        e.stopPropagation();
        const editingState = viewStore.getValue().document.editing;
        const editedNodeId = editingState.activeNodeId;
        if (editedNodeId) {
            saveNodeContent(view);
        } else {
            viewStore.dispatch({
                type: 'DOCUMENT/ENABLE_EDIT_MODE',
                payload: {
                    nodeId,
                    isInSidebar: isInSidebar,
                },
            });
        }
    };
</script>

<FloatingButton
    label={editing ? 'Save' : 'Edit'}
    on:click={toggleEdit}
    position={'down-right'}
>
    {#if editing}
        <SaveIcon class="svg-con" />
    {:else}
        <PencilIcon class="svg-icon" />
    {/if}
</FloatingButton>
