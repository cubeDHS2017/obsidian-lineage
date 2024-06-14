<script lang="ts">
    import { getModalState } from 'src/view/modals/split-node-modal/helpers/get-modal-state';
    import { getModalProps } from 'src/view/modals/split-node-modal/helpers/get-modal-props';
    import { SplitNodeMode } from 'src/stores/document/reducers/split-node/split-node';

    const state = getModalState();
    const props = getModalProps();
    const onModeChange = (value: string) => {
        state.mode.set(value as SplitNodeMode);
    };
    const mode = state.mode;
    const disabledModes = state.disabledModes;
</script>

<div class="split-content-footer">
    <div class="modes-container">
        <label data-disabled={disabledModes.has('headings')}>
            <input
                checked={$mode === 'headings'}
                disabled={disabledModes.has('headings')}
                name="mode"
                on:change={(e) => onModeChange(e.currentTarget.value)}
                type="radio"
                value="headings"
            />
            Headings
        </label>
        <label data-disabled={disabledModes.has('outline')}>
            <input
                checked={$mode === 'outline'}
                disabled={disabledModes.has('outline')}
                name="mode"
                on:change={(e) => onModeChange(e.currentTarget.value)}
                type="radio"
                value="outline"
            />
            Outline
        </label>
    </div>

    <div class="buttons-container">
        <button
            class="mod-cta"
            disabled={!$mode}
            on:click={() => props.callbacks.accept()}
            >Split
        </button>
        <button on:click={() => props.callbacks.reject()}>Cancel</button>
    </div>
</div>

<style>
    .split-content-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .modes-container {
        height: 50px;
        display: flex;
        align-items: center;
    }
    .buttons-container {
        display: flex;
        gap: 5px;
        width: fit-content;
    }
    label {
        display: block;
    }
    label[data-disabled='true'] {
        opacity: 0.6;
    }
</style>
