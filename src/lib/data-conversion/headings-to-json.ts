import { parseDelimiter } from 'src/lib/data-conversion/helpers/delimiter';
import { TreeNode } from 'src/lib/data-conversion/columns-to-json';
import {
    addNewNode,
    State,
    updateCurrentNode,
} from 'src/lib/data-conversion/outilne-to-json';
import { findHighestHeadingLevel } from 'src/lib/data-conversion/helpers/find-highest-heading-level';

export const headingsToJson = (input: string): TreeNode[] => {
    const lines = input.split('\n');
    const highestHeadingLevel = findHighestHeadingLevel(lines);
    const state: State = {
        currentParents: {},
        currentNode: null,
        tree: [],
    };

    for (const line of lines) {
        if (parseDelimiter(line)) throw new Error('input has a section');

        const match = line.match(/^(#+) (.+)/);
        if (match) {
            const level = match[1].length;

            addNewNode(state, level, line, highestHeadingLevel);
        } else {
            updateCurrentNode(state, line);
        }
    }

    return state.tree;
};
