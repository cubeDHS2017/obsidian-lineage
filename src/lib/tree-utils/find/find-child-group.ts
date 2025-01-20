import { Column, NodeId } from 'src/stores/document/document-state-type';

export const findChildGroup = (columns: Column[], node: NodeId) => {
    for (const column of columns) {
        for (const group of column.groups) {
            if (group.parentId === node) {
                return group;
            }
        }
    }
};
