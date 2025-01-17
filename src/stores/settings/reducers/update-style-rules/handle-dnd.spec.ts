import { describe, expect, test } from 'vitest';
import { StyleRule } from 'src/stores/settings/types/style-rules-types';
import { handleDND } from 'src/stores/settings/reducers/update-style-rules/handle-dnd';

const mapColorsToRules = (colors: string[]) =>
    colors.map(
        (color) =>
            ({
                id: color,
                name: color,
                condition: {
                    type: 'condition',
                    scope: 'self',
                    property: 'content',
                    operator: 'contains',
                    value: '5',
                    enabled: true,
                },
                enabled: true,
                priority: 0,
                style: {
                    color,
                    styleVariant: 'left-border',
                },
            }) satisfies StyleRule,
    );
const mapStyleToColors = (rules: StyleRule[]) =>
    rules.map((r) => r.style.color);
describe('handle-dnd', () => {
    test('case 1: dropped>target, before target', () => {
        const input = ['red', 'green', 'blue', 'yellow'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'yellow',
            position: 'before',
            targetId: 'green',
        });
        const output = ['red', 'yellow', 'green', 'blue'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });
    test('case 2:dropped>target, after target', () => {
        const input = ['red', 'green', 'blue', 'yellow'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'yellow',
            position: 'after',
            targetId: 'green',
        });
        const output = ['red', 'green', 'yellow', 'blue'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });
    test('case 3: dropped<target, after target', () => {
        const input = ['green', 'red', 'yellow', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'green',
            position: 'after',
            targetId: 'red',
        });
        const output = ['red', 'green', 'yellow', 'blue'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });
    test('case 4: dropped<target, before target', () => {
        const input = ['green', 'red', 'yellow', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'green',
            position: 'before',
            targetId: 'yellow',
        });
        const output = ['red', 'green', 'yellow', 'blue'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });
    test('case 5: dropping item onto itself', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'green',
            position: 'before',
            targetId: 'green',
        });
        const output = ['red', 'green', 'blue']; // Should maintain original position
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 6: dropping onto first item', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'blue',
            position: 'before',
            targetId: 'red',
        });
        const output = ['blue', 'red', 'green'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 7: dropping onto last item', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'red',
            position: 'after',
            targetId: 'blue',
        });
        const output = ['green', 'blue', 'red'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 8: adjacent items - moving next item before', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'green',
            position: 'before',
            targetId: 'red',
        });
        const output = ['green', 'red', 'blue'];
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 9: empty array', () => {
        const input: string[] = [];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'red',
            position: 'before',
            targetId: 'blue',
        });
        const output: string[] = []; // Should handle empty array gracefully
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 10: invalid targetId', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'green',
            position: 'before',
            targetId: 'purple', // Non-existent target
        });
        const output = ['red', 'green', 'blue']; // Should maintain original order
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 11: invalid droppedId', () => {
        const input = ['red', 'green', 'blue'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'purple', // Non-existent item
            position: 'before',
            targetId: 'green',
        });
        const output = ['red', 'green', 'blue']; // Should maintain original order
        expect(mapStyleToColors(actual)).toEqual(output);
    });

    test('case 12: single item array', () => {
        const input = ['red'];
        const actual = handleDND(mapColorsToRules(input), {
            droppedId: 'red',
            position: 'after',
            targetId: 'red',
        });
        const output = ['red']; // Should maintain position
        expect(mapStyleToColors(actual)).toEqual(output);
    });
});
