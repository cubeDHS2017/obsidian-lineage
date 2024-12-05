import {
    Content,
    PinnedNodesState,
} from 'src/stores/document/document-state-type';

export type RemoveStalePinnedNodesAction = {
    type: 'document/pinned-nodes/remove-stale-nodes';
};

export const removeStalePinnedNodes = (
    pinnedNodes: PinnedNodesState,
    content: Content,
) => {
    pinnedNodes.Ids = pinnedNodes.Ids.filter((id) => content[id]);
};
