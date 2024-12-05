import {
    PinnedNodesState,
    Sections,
} from 'src/stores/document/document-state-type';
import { sortSections } from 'src/helpers/sort-sections';

export type PinNodeAction = {
    type: 'document/pinned-nodes/pin';
    payload: {
        id: string;
    };
};

export const pinNode = (
    sections: Sections,
    pinnedNodes: PinnedNodesState,
    id: string,
) => {
    pinnedNodes.Ids.push(id);
    const pinnedSections = pinnedNodes.Ids.map((id) => sections.id_section[id]);
    const sortedSections = sortSections(pinnedSections);
    pinnedNodes.Ids = sortedSections.map(
        (section) => sections.section_id[section],
    );
};
