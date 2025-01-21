import { describe, expect, it } from 'vitest';
import { ActiveBranch } from 'src/stores/view/reducers/document/helpers/update-active-branch';
import { compareActiveBranch } from 'src/stores/view/reducers/document/helpers/compare-active-branch';

describe('compareActiveBranch', () => {
    it('should return true for identical branches', () => {
        const branch: ActiveBranch = {
            childGroups: new Set(['n1.1', 'n2.1']),
            sortedParentNodes: ['n1', 'n2'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        expect(compareActiveBranch(branch, { ...branch })).toBe(true);
    });

    it('should return true for same reference', () => {
        const branch: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n1'],
            group: 'g1',
            column: 'col1',
            node: 'n1.1',
        };

        expect(compareActiveBranch(branch, branch)).toBe(true);
    });

    it('should return false for different primitive values', () => {
        const branch1: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n1'],
            group: 'g1',
            column: 'col1',
            node: 'n1.1',
        };

        const branch2: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n1'],
            group: 'g2', // different group
            column: 'col1',
            node: 'n1.1',
        };

        expect(compareActiveBranch(branch1, branch2)).toBe(false);
    });

    it('should return false for different sortedParentNodes', () => {
        const branch1: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n1', 'n2'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1',
        };

        const branch2: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n1'], // different length
            group: 'g1',
            column: 'col1',
            node: 'n2.1',
        };

        expect(compareActiveBranch(branch1, branch2)).toBe(false);

        const branch3: ActiveBranch = {
            childGroups: new Set(['n1.1']),
            sortedParentNodes: ['n2', 'n1'], // different order
            group: 'g1',
            column: 'col1',
            node: 'n2.1',
        };

        expect(compareActiveBranch(branch1, branch3)).toBe(false);
    });

    it('should return false for different childGroups', () => {
        const branch1: ActiveBranch = {
            childGroups: new Set(['n1.1', 'n2.1']),
            sortedParentNodes: ['n1', 'n2'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        const branch2: ActiveBranch = {
            childGroups: new Set(['n1.1']), // missing n2.1
            sortedParentNodes: ['n1', 'n2'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        expect(compareActiveBranch(branch1, branch2)).toBe(false);

        const branch3: ActiveBranch = {
            childGroups: new Set(['n1.1', 'n2.2']), // different value
            sortedParentNodes: ['n1', 'n2'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        expect(compareActiveBranch(branch1, branch3)).toBe(false);
    });

    it('should return true for identical states', () => {
        const branch1: ActiveBranch = {
            childGroups: new Set(['n1.1', 'n2.1', 'n2.1.1']),
            sortedParentNodes: ['n1', 'n2', 'n2.1'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        const branch2: ActiveBranch = {
            childGroups: new Set(['n1.1', 'n2.1', 'n2.1.1']),
            sortedParentNodes: ['n1', 'n2', 'n2.1'],
            group: 'g1',
            column: 'col1',
            node: 'n2.1.1',
        };

        expect(compareActiveBranch(branch1, branch2)).toBe(true);
    });
});
