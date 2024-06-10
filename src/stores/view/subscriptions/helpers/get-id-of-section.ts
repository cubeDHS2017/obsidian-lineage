import { Sections } from 'src/stores/document/document-state-type';
import invariant from 'tiny-invariant';

export const getIdOfSection = (sections: Sections, section: string) => {
    const id = sections.section_id[section];
    invariant(id);
    return id;
};
