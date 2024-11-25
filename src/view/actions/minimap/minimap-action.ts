import { LineageView } from 'src/view/view';

export const minimapAction = (element: HTMLElement, view: LineageView) => {
    view.minimapStore.onLoad(element);

    return {
        destroy: () => {
            view.minimapStore.onUnload();
        },
    };
};
