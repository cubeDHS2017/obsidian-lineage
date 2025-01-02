import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';
import { alignGroupOfElementsVertically } from 'src/lib/align-element/align-group-of-elements-vertically';

export const alignChildGroupOfColumn = (
    viewState: ViewState,
    container: HTMLElement,
    columnId: string,
    settings: Settings,
    behavior?: ScrollBehavior,
) => {
    const columnElement = getNodeElement(container, columnId);
    if (!columnElement) return;

    const elements: HTMLElement[] = [];
    for (const childGroup of viewState.document.activeBranch.childGroups) {
        const element = getNodeElement(columnElement, 'group-' + childGroup);
        if (element) {
            elements.push(element);
        }
    }

    alignGroupOfElementsVertically(
        container,
        elements,
        settings.view.zoomLevel,
        null,
        behavior,
    );
};
