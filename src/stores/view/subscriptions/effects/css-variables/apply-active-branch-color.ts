import { LineageView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyActiveBranchColor = (
    view: LineageView,
    color: string | undefined,
) => {
    if (color) {
        view.container!.style.setProperty(
            cssVariables.activeBranchColor,
            color,
        );
    } else {
        view.container!.style.removeProperty(cssVariables.activeBranchColor);
    }
};
