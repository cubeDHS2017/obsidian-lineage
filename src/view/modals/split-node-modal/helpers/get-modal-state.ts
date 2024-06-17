import { getContext } from 'svelte';
import { SplitNodeModalState } from 'src/view/modals/split-node-modal/split-node-modal';

export const getModalState = () => {
    return getContext('modal-state') as SplitNodeModalState;
};
