import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyCardIndentationWidth = (view: LineageView, width: number) => {
    if (typeof width !== 'number') return;
    view.containerEl.style.setProperty(
        cssVariables.cardIndentationWidth,
        `${width}px`,
    );
};
