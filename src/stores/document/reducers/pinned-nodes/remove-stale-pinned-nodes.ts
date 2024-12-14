import {
    Sections,
    PinnedNodesState,
} from 'src/stores/document/document-state-type';
import { sortNodeIdsBySectionNumber } from 'src/stores/document/reducers/pinned-nodes/pin-node';

export type RemoveStalePinnedNodesAction = {
    type: 'document/pinned-nodes/remove-stale-nodes';
};

export const removeStalePinnedNodes = (
    pinnedNodes: PinnedNodesState,
    sections: Sections,
) => {
    pinnedNodes.Ids = pinnedNodes.Ids.filter((id) => sections.id_section[id]);
    pinnedNodes.Ids = sortNodeIdsBySectionNumber(sections, pinnedNodes.Ids);
};
