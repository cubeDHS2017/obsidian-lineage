import { AlignBranchContext } from 'src/stores/view/subscriptions/effects/align-branch/align-branch';
import { alignElementVertically } from 'src/lib/align-element/align-element-vertically';

export const alignParentsNodes = (
    context: AlignBranchContext,
    relativeId: string | null,
) => {
    for (const id of context.activeBranch.sortedParentNodes) {
        alignElementVertically(context, id, relativeId, true);
    }
};
