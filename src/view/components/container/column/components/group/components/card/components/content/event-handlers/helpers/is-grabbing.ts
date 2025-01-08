import { LineageView } from 'src/view/view';

export const isGrabbing = (view: LineageView) => {
    const cursor = view.container!.style.cursor;
    if (cursor === 'grab') return true;
    return false;
};
