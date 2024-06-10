import { describe, expect, test } from 'vitest';
import { outlineExamples } from 'src/lib/data-conversion/test-data/outline-examples';
import { sectionsToOutline } from 'src/lib/data-conversion/sections-to-outline';

describe('sections-to-outline', () => {
    for (const [name, data] of Object.entries(outlineExamples)) {
        test(name, () => {
            expect(sectionsToOutline(data.sections)).toEqual(data.outline);
        });
    }
});
