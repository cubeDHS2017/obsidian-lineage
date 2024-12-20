import { LineageView } from 'src/view/view';
import { getNodeElement } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-node-element';
import { delay } from 'src/helpers/delay';

export const waitForElementToStopMoving = async (
    view: LineageView,
    id: string,
) => {
    const element = getNodeElement(view.container!, id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    let lastRect = rect;
    let retries = 0;
    while (retries < 50) {
        await delay(10);
        const newRect = element.getBoundingClientRect();
        if (newRect.top === lastRect.top && newRect.left === lastRect.left) {
            return;
        }
        lastRect = newRect;
        retries++;
    }
};
