import { LineageView } from 'src/view/view';
import { getElementById } from 'src/lib/align-element/helpers/get-element-by-id';
import { delay } from 'src/helpers/delay';

export const waitForElementToStopMoving = async (
    view: LineageView,
    id: string,
) => {
    const element = getElementById(view.container!, id);
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
