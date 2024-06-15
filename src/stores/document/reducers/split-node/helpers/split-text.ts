import { headingsToSections } from 'src/lib/data-conversion/headings-to-sections';
import { paragraphsToSections } from 'src/lib/data-conversion/paragraphs-to-sections';
import { outlineToSections } from 'src/lib/data-conversion/outline-to-sections';
import { SplitNodeMode } from 'src/stores/document/reducers/split-node/split-node';

export const splitText = (text: string, mode: SplitNodeMode) => {
    if (mode === 'headings') {
        return headingsToSections(text);
    } else if (mode === 'paragraphs') {
        return paragraphsToSections(text);
    } else {
        return outlineToSections(text);
    }
};
