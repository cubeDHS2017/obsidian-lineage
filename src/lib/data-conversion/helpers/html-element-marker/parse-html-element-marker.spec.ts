import { describe, expect, it } from 'vitest';
import { createHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/create-html-element-marker';
import { parseHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/parse-html-element-marker';

describe('parseHtmlElementMarker', () => {
    it('case 1', () => {
        const input = createHtmlElementMarker('3.2', 2);
        const output = ['3.2', '2', '3.2.2'];
        expect(parseHtmlElementMarker(input)).toEqual(output);
    });
    it('case 2', () => {
        const input = createHtmlElementMarker('3.2.1.1', 2);
        const output = ['3.2.1.1', '2', '3.2.1.1.2'];
        expect(parseHtmlElementMarker(input)).toEqual(output);
    });
});
