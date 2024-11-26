import { describe, expect, it } from 'vitest';
import { splitLineIntoChunks } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/split-line-into-chunks';

describe('splitLineIntoChunks', () => {
    it('should split a line into chunks of words and punctuation', () => {
        const input = 'Hello, world!';
        const expected = ['Hello', ',', ' ', 'world', '!'];
        expect(splitLineIntoChunks(input)).toEqual(expected);
    });

    it('case 2', () => {
        const input = 'one ==two== three';
        const expected: string[] = [
            'one',
            ' ',
            '=',
            '=',
            'two',
            '=',
            '=',
            ' ',
            'three',
        ];
        expect(splitLineIntoChunks(input)).toEqual(expected);
    });
});
