import { LineageView } from 'src/view/view';
import { getNodeElement } from 'src/lib/align-element/helpers/get-node-element';
import { delay } from 'src/helpers/delay';

export const waitForElementToStopMoving = async (
    view: LineageView,
    id: string,
) => {
    const element = getNodeElement(view.container!, id);
    if (!element) return;
    let lastRect = element.getBoundingClientRect();
    let retries = 0;
    let matches = 10;
    while (retries < 50) {
        await delay(10);
        const newRect = element.getBoundingClientRect();
        if (newRect.top === lastRect.top && newRect.left === lastRect.left) {
            matches--;
            if (matches === 0) {
                return;
            }
        }
        lastRect = newRect;
        retries++;
    }
};
