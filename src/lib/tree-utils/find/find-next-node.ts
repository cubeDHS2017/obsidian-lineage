import { Sections } from 'src/stores/document/document-state-type';
import { sortSections } from 'src/helpers/sort-sections';

export const findNextNode = (
    sections: Sections,
    node: string,
    direction: 'back' | 'forward',
) => {
    const sortedSections = sortSections(Object.keys(sections.section_id));
    const currentSection = sections.id_section[node];
    const currentSectionIndex = sortedSections.findIndex(
        (section) => currentSection === section,
    );
    if (currentSectionIndex === -1) return node;

    const nextSectionIndex =
        currentSectionIndex + (direction === 'back' ? -1 : +1);
    const nextSection = sortedSections[nextSectionIndex];
    return sections.section_id[nextSection] || node;
};
