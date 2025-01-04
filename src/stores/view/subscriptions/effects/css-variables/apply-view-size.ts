import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

const PADDING_H = 8 * 3 + 34;
const PADDING_V = 8 * 2;
export const applyViewSize = (view: LineageView) => {
    const viewElement = view.contentEl.firstElementChild as HTMLElement | null;
    if (!viewElement) return;
    view.containerEl.style.setProperty(
        cssVariables.viewWidth,
        `${viewElement.innerWidth - PADDING_H}px`,
    );
    view.containerEl.style.setProperty(
        cssVariables.viewHeight,
        `${viewElement.innerHeight - PADDING_V}px`,
    );
};
