import { Column } from 'src/stores/document/document-state-type';
import { getAllChildren } from 'src/lib/tree-utils/get/get-all-children';

export const getTotalChildrenCount = (columns: Column[], nodeId: string) => {
    const children = getAllChildren(columns, nodeId);
    return children.length;
};
