import { NodeId } from 'src/stores/document/document-state-type';

export const getNodeElement = (container: HTMLElement, nodeId: NodeId) => {
    if (nodeId)
        return container.querySelector('#' + nodeId) as HTMLElement | undefined;
};
