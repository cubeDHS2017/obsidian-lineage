import { headingsToHtmlComment } from 'src/lib/data-conversion/x-to-html-comment/headings-to-html-comment';
import { paragraphsToHtmlComment } from 'src/lib/data-conversion/x-to-html-comment/paragraphs-to-html-comment';
import { outlineToHtmlComment } from 'src/lib/data-conversion/x-to-html-comment/outline-to-html-comment';
import { SplitNodeMode } from 'src/stores/document/reducers/split-node/split-node';

export const splitText = (text: string, mode: SplitNodeMode) => {
    if (mode === 'headings') {
        return headingsToHtmlComment(text);
    } else if (mode === 'paragraphs') {
        return paragraphsToHtmlComment(text);
    } else {
        return outlineToHtmlComment(text);
    }
};
