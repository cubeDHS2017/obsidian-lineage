import { level } from 'src/lib/data-conversion/helpers/html-comment-marker/create-html-comment-marker';

export const createHtmlElementMarker = (parentNumber: string, index: number) =>
    ` <span data-section="${level(parentNumber, index)}"/>`;
