import { getElementById } from 'src/lib/align-element/helpers/get-element-by-id';
import { alignGroupOfElementsVertically } from 'src/lib/align-element/align-group-of-elements-vertically';
import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { Column } from 'src/stores/document/document-state-type';

export const alignChildGroupOfColumn = (
    context: AlignBranchContext,
    column: Column,
    relativeId: string | null,
    center: boolean,
) => {
    const columnElement = getElementById(context.container, column.id);
    if (!columnElement) return;

    const childGroups = context.activeBranch.childGroups;

    const childGroupsOfColumn = column.groups
        .filter((g) => childGroups.has(g.parentId))
        .map((g) => 'group-' + g.parentId);

    alignGroupOfElementsVertically(
        context,
        columnElement,
        childGroupsOfColumn,
        relativeId,
        center,
    );
};
