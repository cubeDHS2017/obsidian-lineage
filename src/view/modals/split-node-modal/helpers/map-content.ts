import { diffWords } from 'diff';
import {
    SplitNodeMode,
    splitText,
} from 'src/stores/document/reducers/split-node/split-node';

const escapeHtmlComment = (text: string): string => {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
const makeTabsVisible = (text: string): string => {
    return text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
};

const makeNewlinesVisible = (text: string) => {
    return text.replace(/\n/g, '<br>');
};
export const mapContent = (text: string, mode: SplitNodeMode | null) => {
    let newContent = text;
    if (mode) {
        newContent = splitText(text, mode);
    }

    const differences = diffWords(text, newContent);

    return differences
        .map((part) => {
            const style = part.added
                ? 'color:green; background-color:lightgreen'
                : part.removed
                  ? 'color:red; background-color:#ffdddd'
                  : 'color: grey';

            const escapedComments = escapeHtmlComment(part.value);
            const visibleTabs = makeTabsVisible(escapedComments);
            const value = makeNewlinesVisible(visibleTabs);
            return `<span style="${style}">${value}</span>`;
        })
        .join('');
};
