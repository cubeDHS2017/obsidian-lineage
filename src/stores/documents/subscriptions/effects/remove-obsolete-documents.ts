import Lineage from 'src/main';
import { logger } from 'src/helpers/logger';
import { filterObsoleteDocuments } from 'src/stores/documents/subscriptions/effects/remove-obsolete-documents/helpers/filter-obsolete-documents';
import { getAllLoadedFiles } from 'src/stores/documents/subscriptions/effects/remove-obsolete-documents/helpers/get-all-loaded-files';

export const removeObsoleteDocuments = (plugin: Lineage) => {
    const settings = plugin.settings.getValue();
    const allLoadedFiles = getAllLoadedFiles(plugin);
    const deleted = filterObsoleteDocuments(settings, allLoadedFiles);
    if (deleted === 0) return;

    logger.debug(`[lineage] removed ${deleted} from settings.documents`);
    plugin.settings.dispatch({
        type: 'UPDATE_DOCUMENTS_DICTIONARY',
        payload: {
            documents: settings.documents,
        },
    });
};
