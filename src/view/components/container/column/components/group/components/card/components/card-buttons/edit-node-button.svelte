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
        const documentViewState = viewStore.getValue().document;
        const editingState = documentViewState.editing;
        const editedNodeId = editingState.activeNodeId;
        if (editedNodeId) {
            saveNodeContent(view);
        } else {
            if (isInSidebar) {
                viewStore.dispatch({
                    type: 'view/sidebar/enable-edit',
                    payload: {
                        id: nodeId,
                    },
                });
            } else {
                viewStore.dispatch({
                    type: 'view/main/enable-edit',
                    payload: {
                        nodeId,
                    },
                });
            }
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
