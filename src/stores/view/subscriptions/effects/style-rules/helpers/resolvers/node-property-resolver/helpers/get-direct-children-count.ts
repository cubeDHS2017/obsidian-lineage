import { Column } from 'src/stores/document/document-state-type';
import { findChildGroup } from 'src/lib/tree-utils/find/find-child-group';

export const getDirectChildrenCount = (columns: Column[], nodeId: string) => {
    return findChildGroup(columns, nodeId)?.nodes.length ?? 0;
};
