import { Sections } from 'src/stores/document/document-state-type';

export const maybeGetIdOfSection = (sections: Sections, section: string) => {
    return sections.section_id[section] || null;
};
