import { getContext } from 'svelte';
import { SplitNodeModalProps } from 'src/view/modals/split-node-modal/split-node-modal';

export const getModalProps = () => {
    return getContext('modal-props') as SplitNodeModalProps;
};
