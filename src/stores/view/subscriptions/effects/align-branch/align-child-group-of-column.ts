import { alignElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/align-element/align-element';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { ViewState } from 'src/stores/view/view-state-type';
import { Settings } from 'src/stores/settings/settings-type';

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
    if (columnElement) {
        for (const childGroup of viewState.document.activeBranch.childGroups) {
            const element = getNodeElement(
                columnElement,
                'group-' + childGroup,
            );
            if (element) {
                elements.push(element);
            }
        }

        alignElement(
            container,
            elements.length > 1 ? elements : elements[0],
            behavior,
            'vertical',
            settings.view.scrolling,
            settings.view.zoomLevel,
        );
    }
};
