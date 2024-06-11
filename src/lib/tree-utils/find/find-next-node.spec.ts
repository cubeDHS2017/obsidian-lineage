import { describe, expect, test } from 'vitest';
import { findNextNode } from 'src/lib/tree-utils/find/find-next-node';

describe('find-next-node', () => {
    const n1 = 'n1';
    const n1_1 = 'n1_1';
    const n1_2 = 'n1_2';
    const n1_2_1 = 'n1_2_1';
    const n2 = 'n2';
    const n1_3 = 'n1_3';
    const sections = {
        id_section: {
            [n1]: '1',
            [n1_1]: '1.1',
            [n1_2]: '1.2',
            [n1_2_1]: '1.2.1',
            [n1_3]: '1.3',
            [n2]: '2',
        },
        section_id: {
            '1': n1,
            '1.1': n1_1,
            '1.2': n1_2,
            '1.2.1': n1_2_1,
            '1.3': n1_3,
            '2': n2,
        },
    };

    const tuples = [
        [n1, n1_1],
        [n1_1, n1_2],
        [n1_2, n1_2_1],
        [n1_2_1, n1_3],
        [n1_3, n2],
    ];
    for (const tuple of tuples) {
        test('forward: ' + tuple.join(' - '), () => {
            expect(findNextNode(sections, tuple[0], 'forward')).toBe(tuple[1]);
        });
        test('back: ' + tuple.join(' - '), () => {
            expect(findNextNode(sections, tuple[1], 'back')).toBe(tuple[0]);
        });
    }
    test('edges', () => {
        expect(findNextNode(sections, n1, 'back')).toBe(n1);
        expect(findNextNode(sections, n2, 'forward')).toBe(n2);
    });
});
