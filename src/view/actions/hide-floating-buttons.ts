import { AlwaysShowCardButtons } from 'src/stores/settings/derived/view-settings-store';
import { getView } from 'src/view/components/container/context';

const toggleHideButtons = (element: HTMLElement, hide: boolean) => {
    element.toggleClass('hide-floating-buttons', hide);
};

export const hideFloatingButtons = (element: HTMLElement) => {
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    let hidden = false;
    const delayedHideButtons = () => {
        timeoutHandle = setTimeout(() => {
            if (!hidden) {
                toggleHideButtons(element, true);
                hidden = true;
            }
        }, 5 * 1000);
    };

    const resetHideButtons = () => {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        if (hidden) {
            toggleHideButtons(element, false);
            hidden = false;
        }
    };

    const onMousemove = () => {
        resetHideButtons();
        delayedHideButtons();
    };

    const view = getView();
    const subscription = AlwaysShowCardButtons(view).subscribe((show) => {
        if (show) {
            element.addEventListener('mousemove', onMousemove);
        } else {
            element.removeEventListener('mousemove', onMousemove);
        }
    });
    return {
        destroy: () => {
            resetHideButtons();
            subscription();
            element.removeEventListener('mousemove', onMousemove);
        },
    };
};
