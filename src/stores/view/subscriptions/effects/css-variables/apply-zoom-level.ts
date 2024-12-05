import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyZoomLevel = (view: LineageView, value: number) => {
    if (typeof value !== 'number') return;
    view.containerEl.style.setProperty(cssVariables.zoomLevel, `${value}`);
};
