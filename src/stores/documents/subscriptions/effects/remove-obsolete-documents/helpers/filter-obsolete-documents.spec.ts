import { describe, expect, it } from 'vitest';
import { filterObsoleteDocuments } from './filter-obsolete-documents';
import {
    DocumentPreferences,
    Settings as TSettings,
} from 'src/stores/settings/settings-type';

type Settings = Pick<TSettings, 'documents'>;
const sample: DocumentPreferences = {
    documentFormat: 'sections',
    viewType: 'lineage',
    activeSection: null,
    pinnedSections: null,
};
describe('filterObsoleteDocuments', () => {
    it('should return 0 if allFiles is empty', () => {
        const settings: Settings = { documents: {} };
        const allFiles: Set<string> = new Set();
        const result = filterObsoleteDocuments(settings, allFiles);
        expect(result).toBe(0);
    });

    it('should remove obsolete documents and return the count of deleted documents', () => {
        const settings: Settings = {
            documents: {
                path1: sample,
                path2: sample,
                path3: sample,
            },
        };
        const allFiles: Set<string> = new Set(['path1', 'path3']);
        const result = filterObsoleteDocuments(settings, allFiles);
        expect(result).toBe(1);
        expect(settings.documents).toEqual({
            path1: sample,
            path3: sample,
        });
    });

    it('should not delete any documents if all paths exist in allFiles', () => {
        const settings: Settings = {
            documents: {
                path1: sample,
                path2: sample,
            },
        };
        const allFiles: Set<string> = new Set(['path1', 'path2']);
        const result = filterObsoleteDocuments(settings, allFiles);
        expect(result).toBe(0);
        expect(settings.documents).toEqual({
            path1: sample,
            path2: sample,
        });
    });

    it('should delete all documents if none of the paths exist in allFiles', () => {
        const settings: Settings = {
            documents: {
                path1: sample,
                path2: sample,
            },
        };
        const allFiles: Set<string> = new Set(['path3']);
        const result = filterObsoleteDocuments(settings, allFiles);
        expect(result).toBe(2);
        expect(settings.documents).toEqual({});
    });
});
