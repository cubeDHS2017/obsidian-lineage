import { describe, test, expect } from 'vitest';
import { removeDuplicatesFromArray } from 'src/helpers/remove-duplicates-from-array';

describe('remove duplicates from array', () => {
    test('case 1', () => {
        const input = ['1', '2', '3', '1', '4', '2'];
        const output = ['3', '1', '4', '2'];
        const actual = removeDuplicatesFromArray(input);
        expect(actual).toEqual(output);
    });
});
