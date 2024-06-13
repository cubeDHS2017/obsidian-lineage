import { describe, expect, test } from 'vitest';
import {
    generateBlockId,
    insertBlockId,
} from 'src/view/actions/context-menu/card-context-menu/helpers/insert-block-id';

describe('insert-block-id', () => {
    test('case 1', () => {
        const id = generateBlockId();
        const input = `
# 1
text text


`;
        const output = `
# 1
text text ^${id}`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(output);
    });

    test('case 1b: should insert id at the last non empty line', () => {
        const id = generateBlockId();
        const input = `
# 1
text

x


`;
        const output = `
# 1
text

x ^${id}`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(output);
    });

    test('case 2: should not override existing id', () => {
        const id = generateBlockId();
        const input = `
# 1
text text ^${id}


`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(input);
    });

    test('case 2b: should not override existing id that is not at the end', () => {
        const id = generateBlockId();
        const input = `
# 1
text ^${id}
text text

`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(input);
    });

    test('case 3: should not do anything when input is empty', () => {
        const id = generateBlockId();
        const input = ``;
        const actual = insertBlockId(input, id);
        expect(actual).toBe(undefined);
    });

    test('case 4: should handle input with only whitespace', () => {
        const id = generateBlockId();
        const input = `    `;
        const actual = insertBlockId(input, id);
        expect(actual).toBe(undefined);
    });

    test('case 5: should handle input with multiple sections', () => {
        const id = generateBlockId();
        const input = `
# 1
text text

# 2
more text


        `;
        const output = `
# 1
text text

# 2
more text ^${id}`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(output);
    });

    test('case 6: should handle input that is not trimmed', () => {
        const id = generateBlockId();
        const input = `
# 1
text text   `;
        const output = `
# 1
text text ^${id}`;
        const actual = insertBlockId(input, id);
        expect(actual?.blockId).toBe(id);
        expect(actual?.text).toBe(output);
    });
});
