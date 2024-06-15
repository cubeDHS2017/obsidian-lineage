import { splitByParagraph } from 'src/lib/data-conversion/paragraphs-to-sections';

export const hasNParagraph = (text: string, n = 2) =>
    splitByParagraph(text).length >= n;
