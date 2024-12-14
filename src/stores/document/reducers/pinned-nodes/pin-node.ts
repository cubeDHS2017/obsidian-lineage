import {
    PinnedNodesState,
    Sections,
} from 'src/stores/document/document-state-type';
import { sortSections } from 'src/helpers/sort-sections';

export const sortNodeIdsBySectionNumber = (
    sections: Sections,
    ids: string[],
) => {
    const pinnedSections = ids.map((id) => sections.id_section[id]);
    const sortedSections = sortSections(pinnedSections);
    return sortedSections.map((section) => sections.section_id[section]);
};

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
    pinnedNodes.Ids = sortNodeIdsBySectionNumber(sections, pinnedNodes.Ids);
};
