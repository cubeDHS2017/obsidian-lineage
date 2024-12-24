import { LineageView } from 'src/view/view';

export const minimapAction = (element: HTMLElement, view: LineageView) => {
    view.minimapController.onLoad(element);

    return {
        destroy: () => {
            view.minimapController.onUnload();
        },
    };
};
