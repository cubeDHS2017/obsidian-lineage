import { DocumentState } from 'src/stores/document/document-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { alignElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';

export const scrollFirstColumnToTheLeft = (
    documentState: DocumentState,
    settings: Settings,
    container: HTMLElement,
) => {
    const firstColumnId = documentState.document.columns[0]?.id;
    if (!firstColumnId) return;
    const firstColumnElement = getNodeElement(container, firstColumnId);
    if (!firstColumnElement) return;
    if (firstColumnId) {
        alignElement(
            container,
            firstColumnElement,
            'instant',
            'horizontal',
            settings.view.scrolling,
            settings.view.zoomLevel,
            undefined,
            true,
        );
    }
};
