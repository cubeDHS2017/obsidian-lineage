import { ActiveBranch } from 'src/stores/view/reducers/document/helpers/update-active-branch';

export const compareActiveBranch = (
    a: ActiveBranch,
    b: ActiveBranch,
): boolean => {
    if (a === b) return true;

    if (a.group !== b.group || a.column !== b.column || a.node !== b.node) {
        return false;
    }

    if (a.sortedParentNodes.length !== b.sortedParentNodes.length) {
        return false;
    }

    if (a.childGroups.size !== b.childGroups.size) {
        return false;
    }

    for (let i = 0; i < a.sortedParentNodes.length; i++) {
        if (a.sortedParentNodes[i] !== b.sortedParentNodes[i]) {
            return false;
        }
    }

    for (const item of a.childGroups) {
        if (!b.childGroups.has(item)) {
            return false;
        }
    }

    return true;
};
