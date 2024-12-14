import { splitByParagraph } from 'src/lib/data-conversion/x-to-html-comment/paragraphs-to-html-comment';

export const hasNParagraph = (text: string, n = 2) =>
    splitByParagraph(text).length >= n;
